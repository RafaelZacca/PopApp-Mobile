import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Button, Alert, TouchableNativeFeedback, TouchableHighlight, Platform, ImageBackground } from 'react-native';
import { Home } from './pages/Home'
import { LoadingModal } from './modals/Loading'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Song } from './pages/Song';
import { RecommendationsModal } from './modals/Recommendations';

class App extends Component {
  render() {
    return (
      <AppContainer></AppContainer>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Song: {
      screen: Song,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Modal: {
      screen: LoadingModal,
    },
    AnotherModal: {
      screen: RecommendationsModal,
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transparentCard: true,
    cardStyle: {
      backgroundColor: '#0B0A27',
    },
  }
);

const AppContainer = createAppContainer(RootStack);

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
    paddingTop: 10,
    paddingLeft: 20,
    flexDirection: 'row'
  },
  smallIconLogo: {
    height: 50,
    resizeMode: 'contain'
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
    height: 80
  },
  horizontalLine: {
    borderBottomColor: '#C1C2F980',
    borderBottomWidth: 1,
    width: 100,
    margin: 20
  },
  letsStartButton: {
    width: 200,
    backgroundColor: '#F1304D',
    height: 50,
    borderRadius: 25,
  },
  letsStartButtonText: {
    color: '#fff',
    fontSize: 20,
    height: 50,
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});

export default App;
