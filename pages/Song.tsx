import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Button, Alert, TouchableNativeFeedback, TouchableHighlight, Platform, ImageBackground } from 'react-native';
import { ButtonControl } from './../components/ButtonControl'
import LottieView from 'lottie-react-native';
import { BouncingUpControl } from '../components/BouncingUpControl';

interface Props {
    navigation: any
}

export class Song extends Component<Props> {
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
                        <ImageBackground style={styles.imageBackground} source={require('./../resources/images/gradient_elipse.png')}>
                            <View style={{

                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                borderRadius: 115,
                                width: 230,
                                height: 230,
                                overflow: 'hidden',
                                marginBottom: 15
                            }}>
                                <LottieView style={{

                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                }} source={require('./../resources/animations/walking.json')} autoPlay loop />
                            </View>
                        </ImageBackground>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={{ fontSize: 20, color: '#000000', alignSelf: 'center', textAlignVertical: 'top' }}>Walk alone</Text>
                            <Text style={{ fontSize: 18, color: '#C1C2F9', alignSelf: 'center', opacity: 0.75, textAlignVertical: 'top', marginTop: 10 }}>Green Day</Text>
                        </View>
                        <ButtonControl onPress={this.goRecommendations}>
                            <View style={{ flexDirection: 'column', backgroundColor: 'white' }}>
                                <BouncingUpControl style={{ height: 20, width: 20, alignSelf: 'center', marginBottom: 10, resizeMode: 'contain' }}>
                                    <Image style={{ height: 20, width: 20, alignSelf: 'center', resizeMode: 'contain' }} source={require('./../resources/images/up_arrow.png')}></Image>
                                </BouncingUpControl>
                                <Text style={{ fontSize: 15, color: '#FFF8F8', alignSelf: 'center', textAlignVertical: 'top' }}>RECOMENDACIONES</Text>
                            </View>
                        </ButtonControl>
                        {/* At the bottom comes recomendations */}
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#0B0A27',
        paddingTop: StatusBar.currentHeight
    },
    safeArea: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        height: 70,
        paddingTop: 20,
        paddingLeft: 10,
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    backArrow: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    backHeaderText: {
        color: '#F1304D',
        fontSize: 19,
        height: 30,
        marginLeft: 10,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    body: {
        flex: 3,
        color: '#fff',
        flexDirection: 'column',
        paddingBottom: 20,
    },
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
    imageBackground: {
        flex: 2,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    musicPhrases: {
        color: '#C1C2F980',
        fontSize: 20,
        paddingRight: 60,
        height: 80
    },
    horizontalLine: {
        borderBottomColor: '#C1C2F980',
        borderBottomWidth: 1,
        width: 100,
        margin: 20
    },
    letsStartButton: {
        width: 170,
        backgroundColor: '#F1304D',
        height: 45,
        borderRadius: 22.5,
    },
    letsStartButtonText: {
        color: '#fff',
        fontSize: 20,
        height: 45,
        textAlignVertical: 'center',
        textAlign: 'center'
    }
});

export default Song;