import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { getAudioRecordingPermission } from './Permisions.Manager';

const autoStopRecordingTimer = 3000;

export async function beginRecording(): Promise<Audio.Recording> {
    if (getAudioRecordingPermission()) {
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
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();
        stopRecordingAt20Seconds(recording);
        return recording;
    }
    else {
        return null;
    }
}

export async function stopRecordingAt20Seconds(recording?: Audio.Recording): Promise<boolean> {
    try {
        await new Promise(res => setTimeout(res, autoStopRecordingTimer));
        if ((await recording.getStatusAsync()).isRecording) {
            console.log('¡Recording has just stopped!');
            return await stopRecording(recording);
        }
        else {
            return false;
        }
    } catch (error) {
        console.log('¡Recording has already stopped!');
        return false;
    }
}

export async function getRecordingBase64(recording: Audio.Recording): Promise<string> {
    return await FileSystem.readAsStringAsync(recording.getURI(), { encoding: FileSystem.EncodingType.Base64 });
}

export async function stopRecording(recording: Audio.Recording): Promise<boolean> {
    try {
        await recording.stopAndUnloadAsync();
    } catch (error) {
        console.log('¡Recording has already stopped!')
    }

    // //TODO: Delete this after debuging, this is only with testing purposes
    // await Audio.setAudioModeAsync({
    //     allowsRecordingIOS: false,
    //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //     playsInSilentModeIOS: true,
    //     shouldDuckAndroid: true,
    //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    //     playThroughEarpieceAndroid: false,
    //     staysActiveInBackground: true,
    // });

    // const { sound, status } = await recording.createNewLoadedSoundAsync({
    //     isLooping: true,
    //     isMuted: false,
    //     volume: 1.0,
    //     rate: 1.0,
    //     shouldCorrectPitch: true
    // });

    // sound.playAsync();
    // //The end 
    return true;
}