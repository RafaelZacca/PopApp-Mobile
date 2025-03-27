import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ButtonControl } from '../components/ButtonControl';
import LottieView from 'lottie-react-native';
import { BouncingUpControl } from '../components/BouncingUpControl';
import { Directions, FlingGestureHandler, State as GestureState } from 'react-native-gesture-handler';
import SongModel from '../models/Song.Model';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SongPage'>;

const animations = [
  require('./../resources/animations/walking.json'),
  require('./../resources/animations/rocket.json'),
  require('./../resources/animations/jolly.json'),
  require('./../resources/animations/hair.json'),
  require('./../resources/animations/dance.json'),
];

const SongPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute(); // by default, useRoute is loosely typed — you can use generics if needed
  const song = route.params as SongModel;

  const [animation] = useState<any>(animations[Math.floor(Math.random() * animations.length)]);

  const goBack = () => navigation.goBack();

  const goRecommendations = () => {
    navigation.navigate('RecommendationsModal', {
      recognition: song,
      animation,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.safeArea}>
        <ButtonControl onPress={goBack}>
          <View style={styles.header}>
            <Image style={styles.backArrow} source={require('./../resources/images/back_arrow.png')} />
            <Text style={styles.backHeaderText}>Atrás</Text>
          </View>
        </ButtonControl>

        <View style={styles.body}>
          <ImageBackground
            style={styles.imageBackground}
            source={require('./../resources/images/gradient_elipse.png')}
          >
            <View style={styles.animationContainer}>
              <LottieView style={styles.animation} source={animation} autoPlay loop />
            </View>
          </ImageBackground>

          <View style={styles.songContainer}>
            <Text style={styles.songTitle}>{song.name}</Text>
            <Text style={styles.songArtist}>{song.artistName}</Text>
          </View>

          <FlingGestureHandler
            direction={Directions.UP}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === GestureState.END) {
                goRecommendations();
              }
            }}
          >
            <View style={styles.recommendationsContainer}>
              <BouncingUpControl style={styles.bouncingControl}>
                <Image style={styles.bouncingIcon} source={require('./../resources/images/up_arrow.png')} />
              </BouncingUpControl>
              <Text style={styles.recommendationsText}>RECOMENDACIONES</Text>
            </View>
          </FlingGestureHandler>
        </View>
      </View>
    </View>
  );
};

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