import React, { Component } from 'react'
import { Text, View, Image } from 'react-native';
import { ButtonControl } from './../components/ButtonControl'
import LottieView from 'lottie-react-native';
import { IProps } from '../interfaces/IProps';

export class LoadingModal extends Component<IProps> {
    close = () => { this.props.navigation.goBack() }
    goSong = () => { this.props.navigation.navigate('Song') }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', alignContent: 'stretch', justifyContent: 'flex-start', backgroundColor: '#020113', margin: 20, marginTop: 40, borderRadius: 20, padding: 20 }}>
                <ButtonControl onPress={this.close}><Image source={require('./../resources/images/close_button.png')} style={{ height: 35, width: 35, alignSelf: 'flex-end' }} /></ButtonControl>

                <View style={{ flex: 1, justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', marginBottom: 30 }}>
                    <LottieView source={require('./../resources/loader.json')} autoPlay loop style={{ height: 100, width: 50 }} />
                </View>
                <ButtonControl onPress={this.goSong}>
                    <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'center', flex: 1, textAlignVertical: 'top' }}>Escuchando...</Text>
                </ButtonControl>

            </View>
        );
    }
}