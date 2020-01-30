import React, { Component } from 'react'
import { Text, View, Image, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { ButtonControl } from './../components/ButtonControl'
import LottieView from 'lottie-react-native';
import { BouncingUpControl } from '../components/BouncingUpControl';
import { styles } from '../styles/Styles';
import { IProps } from '../interfaces/IProps';

export class Song extends Component<IProps> {
    goBack = () => { this.props.navigation.goBack() }
    goRecommendations = () => { this.props.navigation.navigate('AnotherModal') }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.safeArea}>
                    <ButtonControl onPress={this.goBack}>
                        <View style={styles.header} >
                            <Image style={styles.backArrow} source={require('./../resources/images/back_arrow.png')}></Image>
                            <Text style={styles.backHeaderText}>Atrás</Text>
                        </View>
                    </ButtonControl>

                    <View style={styles.body}>
                        <ImageBackground style={songStyles.underAnimationImage} source={require('./../resources/images/gradient_elipse.png')}>
                            <View style={songStyles.songAnimationContainer}>
                                <LottieView style={songStyles.songAnimation} source={require('./../resources/animations/walking.json')} autoPlay loop />
                            </View>
                        </ImageBackground>

                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'center', textAlignVertical: 'top' }}>Walk alone</Text>
                            <Text style={{ fontSize: 18, color: '#C1C2F9', alignSelf: 'center', opacity: 0.75, textAlignVertical: 'top', marginTop: 10 }}>Green Day</Text>
                        </View>

                        <ButtonControl onPress={this.goRecommendations}>
                            <View style={{ flexDirection: 'column' }}>
                                <BouncingUpControl style={{ height: 20, width: 20, alignSelf: 'center', marginBottom: 10, resizeMode: 'contain' }}>
                                    <Image style={{ height: 20, width: 20, alignSelf: 'center', resizeMode: 'contain' }} source={require('./../resources/images/up_arrow.png')}></Image>
                                </BouncingUpControl>
                                <Text style={{ fontSize: 15, color: '#FFF8F8', alignSelf: 'center', textAlignVertical: 'top' }}>RECOMENDACIONES</Text>
                            </View>
                        </ButtonControl>
                    </View>
                </View>
            </View>

        )
    }
}

const songStyles = StyleSheet.create({
    underAnimationImage: {
        flex: 2,
        width: '100%',
        padding: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'flex-end',
        alignItems: 'center'
    },
    songAnimationContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 115,
        width: 230,
        height: 230,
        overflow: 'hidden',
        marginBottom: 15
    },
    songAnimation: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});

export default Song;