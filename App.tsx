import React, { Component } from 'react';
import { Home } from './pages/Home'
import { LoadingModal } from './modals/Loading'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Song } from './pages/Song';
import { RecommendationsModal } from './modals/Recommendations';
import { ScreenEnum } from './enums/ScreensEnum';

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
    initialRouteName: ScreenEnum.Home,
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

export default App;
