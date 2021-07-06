import React, { Component } from 'react';
import { StyleSheet, StatusBar, LogBox } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SongPage from './pages/Song.Page';
import HomePage from './pages/Home.Page';
import { RecommendationsModal } from './modals/Recommendations.Modal';
import { LoadingModal } from './modals/Loading.Modal';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import login from './services/Auth.Service';
import UserModel from './models/User.Model';
import * as ExpoConstants from 'expo-constants';

class App extends Component {
  abortController = new AbortController();

  async componentDidMount() {
    let deviceInfo = await Notifications.getDevicePushTokenAsync();
    let authentication = await login({ password: deviceInfo.data, userName: ExpoConstants.default.deviceId } as UserModel, this.abortController.signal);
    await SecureStore.setItemAsync('token', authentication.token);
  }

  render() {
    LogBox.ignoreAllLogs(true)

    return (
      <AppContainer></AppContainer>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomePage,
    },
    Song: {
      screen: SongPage,
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
    LoadingModal: {
      screen: LoadingModal,
    },
    RecommendationsModal: {
      screen: RecommendationsModal,
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      cardOverlayEnabled: true,
      cardStyle: { backgroundColor: 'transparent' },
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
            extrapolate: 'clamp',
          }),
        },
      }),
    }
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
