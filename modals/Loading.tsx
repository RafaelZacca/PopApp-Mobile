import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Button, Alert, TouchableNativeFeedback, TouchableHighlight, Platform, ImageBackground } from 'react-native';
import { ButtonControl } from './../components/ButtonControl'
import LottieView from 'lottie-react-native';

interface Props {
    navigation: any
}

export class LoadingModal extends Component<Props> {
    close = () => { this.props.navigation.goBack() }
    goSong = () => { this.props.navigation.navigate('Song') }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', alignContent: 'stretch', justifyContent: 'flex-start', backgroundColor: '#020113', margin: 20, marginTop: 40, borderRadius: 20, padding: 20 }}>
                <ButtonControl onPress={this.close}><Image source={require('./../resources/images/close_button.png')} style={{ height: 35, width: 35, alignSelf: 'flex-end' }} /></ButtonControl>

                <View style={{ flex: 1, justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', marginBottom: 30 }}>
                    <LottieView source={require('./../resources/loader.json')} autoPlay loop style={{ height: 100, width: 50 }} />
                </View>
                <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'center', flex: 1, textAlignVertical: 'top' }}>Escuchando...</Text>
                <ButtonControl onPress={this.goSong}><View style={{ flex: 1, justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', marginBottom: 30 }}><Text>GOSONG</Text></View></ButtonControl>

            </View>
        );
    }
}