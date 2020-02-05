import * as Permissions from 'expo-permissions';

export const askForAudioRecordingPermission = async () => {
    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
};

export const getAudioRecordingPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
        //TODO: Customize alert, to make it acording to theme
        alert('Debes permitir a la aplicación utilizar la grabadora de voz para poder continuar.');
    }
    return status === 'granted'
}