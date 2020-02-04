import React, { Component } from 'react'
import { Text, View, Image, ImageBackground, StyleSheet } from 'react-native';
import { ButtonControl } from '../components/ButtonControl'
import { styles } from '../styles/Styles';
import { IProps } from '../interfaces/IProps';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));

export class Home extends Component<IProps> {
    recording: any;
    sound: any;
    isRecording: boolean = false;
    state = {
        haveRecordingPermissions: false,
        isLoading: false,
        isPlaybackAllowed: false,
        muted: false,
        soundPosition: null,
        soundDuration: null,
        recordingDuration: null,
        shouldPlay: false,
        isPlaying: false,
        isRecording: false,
        fontLoaded: false,
        shouldCorrectPitch: true,
        volume: 1.0,
        rate: 1.0,
    };
    start = () => {
        if (!this.isRecording) {
            this.beginRecording();
            this.isRecording = true;
            // this.props.navigation.navigate('Modal');
        }
        else {
            this._stopRecordingAndEnablePlayback();
            this.isRecording = false;

        }
    }

    componentDidMount() {
        this._askForPermissions();
    }

    _askForPermissions = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({
            haveRecordingPermissions: response.status === 'granted',
        });
    };

    async beginRecording() {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
        });

        const recording = new Audio.Recording();
        this.recording = recording;
        this.recording.setOnRecordingStatusUpdate(console.log);
        await this.recording.prepareToRecordAsync(recordingSettings);

        await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
        this.setState({
            isLoading: false,
        });
    }

    async _stopRecordingAndEnablePlayback() {
        this.setState({
            isLoading: true,
        });
        try {
            await this.recording.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing -- we are already unloaded.
        }
        const info = await FileSystem.getInfoAsync(this.recording.getURI());
        console.log(`FILE INFO: ${JSON.stringify(info)}`);
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
        });
        const { sound, status } = await this.recording.createNewLoadedSoundAsync(
            {
                isLooping: true,
                isMuted: this.state.muted,
                volume: this.state.volume,
                rate: this.state.rate,
                shouldCorrectPitch: this.state.shouldCorrectPitch,
            }
        );
        this.sound = sound;
        this.setState({
            isLoading: false,
        });
        this.sound.playAsync();
    }

    render() {
        return (
            <View style={homeStyles.container}>
                <View style={homeStyles.safeArea}>
                    <View style={homeStyles.header}>
                        <Image style={homeStyles.smallIconLogo} source={require('./../resources/images/small_logo.png')}></Image>
                    </View>

                    <View style={homeStyles.body}>
                        <ImageBackground style={homeStyles.imageBackground} source={require('./../resources/images/main_background.png')}>
                            <View style={homeStyles.topBody}>
                                <View style={homeStyles.horizontalLine} />
                                <Text style={homeStyles.musicPhrases} numberOfLines={3} lineBreakMode='tail'>La música es el arte más directo, entra por el oído y sale por el corazón </Text>
                            </View>
                            <View style={homeStyles.bottomBody}>
                                <ButtonControl onPress={this.start}><View style={homeStyles.letsStartButton}><Text style={homeStyles.letsStartButtonText}>ESCUCHAR</Text></View></ButtonControl>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </View>

        )
    }
}

const homeStyles = {
    ...styles, ...StyleSheet.create({
        topBody: {
            flex: 1,
            height: '100%',
            padding: 20,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignContent: 'flex-end',
            alignItems: 'flex-start',
        },
        bottomBody: {
            flex: 1,
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
    })
}

export default Home;