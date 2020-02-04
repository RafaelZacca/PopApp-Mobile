import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, FlatList, ImageBackground, StatusBar, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { ButtonControl } from './../components/ButtonControl'
import { IProps } from '../interfaces/IProps';
import { styles } from '../styles/Styles';

export class RecommendationsModal extends Component<IProps> {
    close = () => { this.props.navigation.goBack() }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'flex-start', alignContent: 'center', justifyContent: 'flex-start', backgroundColor: '#020113', margin: 20, marginTop: 40, borderRadius: 20, overflow: 'hidden' }}>
                <ScrollView style={{ flex: 1, alignSelf: 'stretch', paddingHorizontal: 20 }}>
                    <View style={{ marginTop: 20, flex: 1, alignItems: 'flex-start', alignContent: 'stretch', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 24, color: '#fff', flex: 1, textAlignVertical: 'top' }}>Tu canción</Text>
                        <ButtonControl onPress={this.close}><Image source={require('./../resources/images/close_button.png')} style={{ height: 35, width: 35 }} /></ButtonControl>
                    </View>

                    <View style={{ flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <ImageBackground style={styles.imageBackground} source={require('./../resources/images/gradient_elipse_dark.png')}>
                            <View style={{

                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50,
                                width: 100,
                                height: 100,
                                overflow: 'hidden',
                                marginBottom: 0,
                                marginRight: 5
                            }}>
                                <LottieView style={{

                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                }} source={require('./../resources/animations/walking.json')} autoPlay loop />
                            </View>
                        </ImageBackground>
                        <View style={{ flex: 1, alignItems: 'flex-start', alignContent: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
                            <Text style={{ fontSize: 20, color: '#fff', textAlignVertical: 'top', alignSelf: 'stretch' }}>Over the rainbow</Text>
                            <Text style={{ fontSize: 16, color: '#C1C2F9', textAlignVertical: 'top', opacity: 0.7 }}>Judy Garland</Text>
                        </View>
                    </View>

                    <Text style={{ fontSize: 24, color: '#fff', alignSelf: 'flex-start', flex: 1, textAlignVertical: 'center', height: 35 }}>Recomendaciones</Text>
                    <FlatList style={{ alignSelf: 'stretch', marginBottom: 20 }}
                        data={[
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                            { song: 'Over the rainbow', singer: 'Judy Garland' },
                        ]}
                        renderItem={({ item }) =>
                            <View style={{ alignItems: 'stretch', marginTop: 10, alignContent: 'stretch', justifyContent: 'flex-start', flexDirection: 'row', height: 70, backgroundColor: '#0B0A27', borderRadius: 20, overflow: 'hidden' }}>
                                <Image
                                    style={{ width: 70, height: 70 }}
                                    source={require('./../resources/images/gd.png')}
                                />
                                <View style={{ flex: 1, alignItems: 'flex-start', alignContent: 'center', justifyContent: 'center', flexDirection: 'column', marginLeft: 30 }}>
                                    <Text style={{ fontSize: 18, color: '#fff', textAlignVertical: 'top', alignSelf: 'stretch' }}>{item.song}</Text>
                                    <Text style={{ fontSize: 16, color: '#C1C2F9', textAlignVertical: 'top', opacity: 0.7 }}>{item.singer}</Text>
                                </View>
                            </View>}
                    />
                </ScrollView>
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         backgroundColor: '#0B0A27',
//         paddingTop: StatusBar.currentHeight
//     },
//     safeArea: {
//         flex: 1,
//         flexDirection: 'column',
//     },
//     header: {
//         height: 70,
//         paddingTop: 20,
//         paddingLeft: 10,
//         flexDirection: 'row',
//         alignContent: 'flex-start',
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start',
//     },
//     backArrow: {
//         height: 30,
//         width: 30,
//         resizeMode: 'contain',
//     },
//     backHeaderText: {
//         color: '#F1304D',
//         fontSize: 19,
//         height: 30,
//         marginLeft: 10,
//         textAlignVertical: 'center',
//         textAlign: 'center'
//     },
//     body: {
//         flex: 3,
//         color: '#fff',
//         flexDirection: 'column',
//         paddingBottom: 20,
//     },
//     topBody: {
//         flex: 1,
//         height: '100%',
//         padding: 20,
//         flexDirection: 'column',
//         justifyContent: 'flex-end',
//         alignContent: 'flex-end',
//         alignItems: 'flex-start',
//     },
//     bottomBody: {
//         flex: 1,
//         padding: 20,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignContent: 'center',
//         alignItems: 'center',
//     },
//     imageBackground: {
//         flex: 1,
//         width: 160,
//         height: 160,
//         justifyContent: 'center',
//         alignContent: 'center',
//         alignItems: 'center'
//     },
//     musicPhrases: {
//         color: '#C1C2F980',
//         fontSize: 20,
//         paddingRight: 60,
//         height: 80
//     },
//     horizontalLine: {
//         borderBottomColor: '#C1C2F980',
//         borderBottomWidth: 1,
//         width: 100,
//         margin: 20
//     },
//     letsStartButton: {
//         width: 170,
//         backgroundColor: '#F1304D',
//         height: 45,
//         borderRadius: 22.5,
//     },
//     letsStartButtonText: {
//         color: '#fff',
//         fontSize: 20,
//         height: 45,
//         textAlignVertical: 'center',
//         textAlign: 'center'
//     }
// });