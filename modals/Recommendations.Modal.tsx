import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { ButtonControl } from '../components/ButtonControl';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type RecommendationsModalNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RecommendationsModal'>;

const RecommendationsModal: React.FC = () => {
  const navigation = useNavigation<RecommendationsModalNavigationProp>();
  const route = useRoute();
  const { recognition: song, animation } = route.params as RootStackParamList['RecommendationsModal'];

  const close = () => navigation.goBack();

  return (
    <View style={styles.modal}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Tu canción</Text>
          <ButtonControl onPress={close}>
            <View>
              <Image source={require('./../resources/images/close_button.png')} style={styles.closeButton} />
            </View>
          </ButtonControl>
        </View>

        <View style={styles.songContainer}>
          <ImageBackground
            style={styles.imageBackground}
            source={require('./../resources/images/gradient_elipse_dark.png')}
          >
            <View style={styles.animationContainer}>
              <LottieView style={styles.animation} source={animation} autoPlay loop />
            </View>
          </ImageBackground>

          <View style={styles.songInfoContainer}>
            <Text style={styles.songTitle}>{song.name}</Text>
            <Text style={styles.songArtist}>{song.artistName}</Text>
          </View>
        </View>

        <Text style={styles.recommendationsSectionTitle}>Recomendaciones</Text>

        {song?.recommendedSongs?.map((item, index) => (
          <View style={styles.recommendedSongContainer} key={index}>
            {item.image?.url ? (
              <Image
                style={styles.recommendedSongImage}
                source={{
                  uri: item.image.url,
                  height: item.image.height,
                  width: item.image.width,
                }}
                PlaceholderContent={<ActivityIndicator />}
              />
            ) : (
              <Image
                style={styles.recommendedSongImage}
                source={require('./../resources/images/star.png')}
              />
            )}
            <View style={styles.recommendedSongInfoContainer}>
              <Text numberOfLines={1} style={styles.recommendedSongTitle}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={styles.recommendedSongArtist}>
                {item.artistName}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#020113',
    margin: 20,
    marginTop: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
  modalHeader: {
    marginTop: 20,
    flex: 1,
    alignItems: 'flex-start',
    alignContent: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  imageBackground: {
    flex: 1,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    color: '#fff',
    flex: 1,
    textAlignVertical: 'top',
  },
  closeButton: {
    height: 35,
    width: 35,
    zIndex: 2,
  },
  songContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  animationContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 100,
    height: 100,
    overflow: 'hidden',
    marginBottom: 0,
    marginRight: 5,
  },
  animation: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  songInfoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  songTitle: {
    fontSize: 20,
    color: '#fff',
    textAlignVertical: 'top',
    alignSelf: 'stretch',
  },
  songArtist: {
    fontSize: 16,
    color: '#C1C2F9',
    textAlignVertical: 'top',
    opacity: 0.7,
  },
  recommendationsSectionTitle: {
    fontSize: 24,
    color: '#fff',
    alignSelf: 'flex-start',
    flex: 1,
    textAlignVertical: 'center',
    height: 35,
  },
  recommendedSongContainer: {
    alignItems: 'stretch',
    marginTop: 10,
    alignContent: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#0B0A27',
    borderRadius: 20,
    overflow: 'hidden',
  },
  recommendedSongImage: {
    width: 70,
    height: 70,
  },
  recommendedSongInfoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 30,
  },
  recommendedSongTitle: {
    fontSize: 18,
    color: '#fff',
    textAlignVertical: 'top',
    alignSelf: 'stretch',
  },
  recommendedSongArtist: {
    fontSize: 16,
    color: '#C1C2F9',
    textAlignVertical: 'top',
    opacity: 0.7,
  },
});

export default RecommendationsModal;
