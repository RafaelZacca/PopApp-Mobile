import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';

const state = {
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

const recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));

async function beginRecording() {
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