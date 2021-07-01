import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { ButtonControl } from '../components/ButtonControl'
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import sendMusicAndRecognizeSong from '../services/Recognitions.Service';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import SongModel from '../models/Song.Model';
import RecognitionModel from '../models/Recognition.Model';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface State {
    recording: Audio.Recording,
    recordUri: string,
}

const AudioOptions: Audio.RecordingOptions = {
    android: {
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
        bitRate: 128000,
        extension: ".mp3",
        numberOfChannels: 1,
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
        sampleRate: 44100
    },
    ios: {
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
        bitRate: 128000,
        extension: ".mp3",
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
        numberOfChannels: 1,
        sampleRate: 44100,
    }
}

export class LoadingModal extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            recording: null,
            recordUri: null,
        }
    }

    abortController = new AbortController();

    componentDidMount() {
        this.listen();
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    close = () => { this.props.navigation.goBack() }
    goSong = (song: SongModel) => { this.props.navigation.navigate('Song', song) }
    sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    startRecording = async () => {
        try {
            console.log('Requesting permissions..');

            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const newRecord = new Audio.Recording();
            await newRecord.prepareToRecordAsync(AudioOptions);
            await newRecord.startAsync();
            this.setState({
                recording: newRecord
            });
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    stopRecording = async () => {
        console.log('Stopping recording..');
        await this.state.recording.stopAndUnloadAsync();
        const uri = this.state.recording.getURI();
        this.setState({
            recordUri: uri,
            recording: undefined
        });
        let fileBase64 = await FileSystem.readAsStringAsync(this.state.recordUri, { encoding: 'base64' });

        await this.sendRecordAndRequestRecognition(fileBase64);
        console.log('Recording stopped and stored at', uri);
    }

    sendRecordAndRequestRecognition = async (fileBase64: string) => {
        try {
            let response = await sendMusicAndRecognizeSong({ base64: fileBase64 } as RecognitionModel, this.abortController.signal);
            this.goSong(response);
        } catch (error) {
            console.error(error);
            await this.listen();
        }
    }

    listen = async () => {
        await this.startRecording();
        await this.sleep(20000);
        await this.stopRecording();
    }

    render() {
        return (
            <View style={styles.modal}>
                <ButtonControl onPress={this.close}><Image source={require('./../resources/images/close_button.png')} style={styles.closeButton} /></ButtonControl>

                <View style={styles.animationContainer}>
                    <LottieView source={require('./../resources/animations/loading.json')} autoPlay loop style={styles.animation} />
                </View>
                <Text style={styles.actionDescription}>Escuchando...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1, 
        alignItems: 'center', 
        alignContent: 'stretch', 
        justifyContent: 'flex-start', 
        backgroundColor: '#020113', 
        margin: 20, 
        marginTop: 40, 
        borderRadius: 20, 
        padding: 20 
    },
    closeButton: {
        height: 35,
        width: 35,
        alignSelf: 'flex-end'
    },
    animationContainer: {
        flex: 1, 
        justifyContent: 'flex-end', 
        alignContent: 'flex-end', 
        alignItems: 'flex-end', 
        marginBottom: 30 
    },
    animation: {
        height: 100, width: 50
    },
    actionDescription: {
        fontSize: 20, 
        color: '#fff', 
        alignSelf: 'center', 
        textAlignVertical: 'top',
        flex:1
    }
});