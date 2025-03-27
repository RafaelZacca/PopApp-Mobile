import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ButtonControl } from '../components/ButtonControl';
import { Phrases } from '../supports/constants/Phrases.Constant';

const HomePage: React.FC = () => {
  const navigation = useNavigation<any>(); // 👈 If you want to type this later, let me know
  const [phrase, setPhrase] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const getRandomPhrase = async () => {
      try {
        let phrase = Phrases[Math.floor(Math.random() * Phrases.length)];
        setPhrase(phrase);
      } catch (error) {
        console.error(error);
      }
    };

    getRandomPhrase();

    return () => {
      abortController.abort();
    };
  }, []);

  const start = () => {
    navigation.navigate('LoadingModal');
  };

  return (
    <View style={styles.container}>
      <View style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            style={styles.smallIconLogo}
            source={require('./../resources/images/small_logo.png')}
          />
        </View>

        <View style={styles.body}>
          <ImageBackground
            style={styles.imageBackground}
            source={require('./../resources/images/main_background.png')}
          >
            <View style={styles.topBody}>
              <View style={styles.horizontalLine} />
              <Text style={styles.musicPhrases} numberOfLines={3} lineBreakMode="tail">
                {phrase}
              </Text>
            </View>
            <View style={styles.bottomBody}>
              <ButtonControl onPress={start}>
                <View style={styles.letsStartButton}>
                  <Text style={styles.letsStartButtonText}>ESCUCHAR</Text>
                </View>
              </ButtonControl>
            </View>
          </ImageBackground>
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
    paddingTop: StatusBar.currentHeight,
  },
  safeArea: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: 70,
    paddingTop: 10,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  smallIconLogo: {
    height: 60,
    resizeMode: 'contain',
    width: 120,
  },
  body: {
    flex: 3,
    color: '#fff',
    flexDirection: 'column',
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
    flex: 1,
    width: '100%',
    height: '100%',
  },
  musicPhrases: {
    color: '#C1C2F980',
    fontSize: 20,
    paddingRight: 60,
    height: 80,
  },
  horizontalLine: {
    borderBottomColor: '#C1C2F980',
    borderBottomWidth: 1,
    width: 100,
    margin: 20,
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
    textAlign: 'center',
  },
});

export default HomePage;
