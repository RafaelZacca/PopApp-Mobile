import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ButtonControl } from '../components/ButtonControl';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import sendMusicAndRecognizeSong from '../services/Recognitions.Service';
import RecognitionModel from '../models/Recognition.Model';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const AudioOptions: Audio.RecordingOptions = {
    android: {
      extension: '.mp3',
      outputFormat: 2, // MediaRecorder.OutputFormat.MPEG_4
      audioEncoder: 3, // MediaRecorder.AudioEncoder.AAC
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
    },
    ios: {
      extension: '.caf',
      audioQuality: 44100,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType: 'audio/webm',
      bitsPerSecond: 128000,
    },
  };
  

const LoadingModal: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [recordUri, setRecordUri] = useState<string | null>(null);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    const listen = async () => {
      await startRecording();
      await sleep(20000);
      await stopRecording();
    };

    listen();

    return () => {
      abortControllerRef.current.abort();
    };
  }, []);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(AudioOptions);
      await newRecording.startAsync();

      recordingRef.current = newRecording;
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      const recording = recordingRef.current;
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      setRecordUri(uri);

      if (!uri) throw new Error('Recording URI is null');

      const fileBase64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

      await sendRecordAndRequestRecognition(fileBase64);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const sendRecordAndRequestRecognition = async (fileBase64: string) => {
    try {
      const response = await sendMusicAndRecognizeSong(
        { base64: fileBase64 } as RecognitionModel,
        abortControllerRef.current.signal
      );

      navigation.navigate('SongPage', response);
    } catch (error) {
      console.error('Recognition error:', error);
      await sleep(2000);
      await startRecording(); // retry
      await sleep(20000);
      await stopRecording();
    }
  };

  const close = () => navigation.goBack();

  return (
    <View style={styles.modal}>
      <ButtonControl onPress={close}>
        <Image source={require('./../resources/images/close_button.png')} style={styles.closeButton} />
      </ButtonControl>

      <View style={styles.animationContainer}>
        <LottieView
          source={require('./../resources/animations/loading.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <Text style={styles.actionDescription}>Escuchando...</Text>
    </View>
  );
};

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
    padding: 20,
  },
  closeButton: {
    height: 35,
    width: 35,
    alignSelf: 'flex-end',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  animation: {
    height: 100,
    width: 50,
  },
  actionDescription: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
    textAlignVertical: 'top',
    flex: 1,
  },
});

export default LoadingModal;
