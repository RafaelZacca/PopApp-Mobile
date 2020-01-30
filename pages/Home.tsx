import React, { Component } from 'react'
import { Text, View, Image, ImageBackground, StyleSheet } from 'react-native';
import { ButtonControl } from '../components/ButtonControl'
import { styles } from '../styles/styles';
import { IProps } from '../interfaces/IProps';

export class Home extends Component<IProps> {
    start = () => { this.props.navigation.navigate('Modal') }

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

const homeStyles = {...styles, ...StyleSheet.create({
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
})}

export default Home;