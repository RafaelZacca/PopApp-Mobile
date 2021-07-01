import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, ImageBackground } from 'react-native';
import { ButtonControl } from '../components/ButtonControl'
import LottieView from 'lottie-react-native';
import { BouncingUpControl } from '../components/BouncingUpControl';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Directions, FlingGestureHandler } from 'react-native-gesture-handler';
import SongModel from '../models/Song.Model';

interface Props {
    navigation: NavigationScreenProp<NavigationState, SongModel>,
}

interface State {
    song: SongModel;
    animation: any;
}

const animations = [require('./../resources/animations/walking.json'), require('./../resources/animations/rocket.json'), require('./../resources/animations/jolly.json'), require('./../resources/animations/hair.json'), require('./../resources/animations/dance.json')]

class SongPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            song: props.navigation.state.params,
            animation: animations[Math.floor(Math.random() * animations.length)]
        }
    }

    goBack = () => { this.props.navigation.goBack() }
    goRecommendations = () => { this.props.navigation.navigate('RecommendationsModal', { recognition: this.state.song, animation: this.state.animation }) }

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
                            <View style={styles.animationContainer}>
                                <LottieView style={styles.animation} source={this.state.animation} autoPlay loop />
                            </View>
                        </ImageBackground>
                        <View style={styles.songContainer}>
                            <Text style={styles.songTitle}>{this.state.song.name}</Text>
                            <Text style={styles.songArtist}>{this.state.song.artistName}</Text>
                        </View>
                        <FlingGestureHandler onHandlerStateChange={this.goRecommendations} direction={Directions.UP}>
                            <View style={styles.recommendationsContainer}>
                                <BouncingUpControl style={styles.bouncingControl}>
                                    <Image style={styles.bouncingIcon} source={require('./../resources/images/up_arrow.png')}></Image>
                                </BouncingUpControl>
                                <Text style={styles.recommendationsText}>RECOMENDACIONES</Text>
                            </View>
                        </FlingGestureHandler >
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
    imageBackground: {
        flex: 2,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    animationContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 115,
        width: 230,
        height: 230,
        overflow: 'hidden',
        marginBottom: 15
    },
    animation: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    songContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    songTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        alignSelf: 'center',
        textAlignVertical: 'top'
    },
    songArtist: {
        fontSize: 18,
        color: '#C1C2F9',
        alignSelf: 'center',
        opacity: 0.75,
        textAlignVertical: 'top',
        marginTop: 10
    },
    recommendationsContainer: {
        flexDirection: 'column'
    },
    bouncingControl: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginBottom: 10,
        resizeMode: 'contain'
    },
    bouncingIcon: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    recommendationsText: {
        fontSize: 15,
        color: '#FFF8F8',
        alignSelf: 'center',
        textAlignVertical: 'top'
    }
});

export default SongPage;