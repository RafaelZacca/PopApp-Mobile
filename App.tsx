import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SongPage from './pages/Song.Page';
import HomePage from './pages/Home.Page';
import RecommendationsModal from './modals/Recommendations.Modal';
import LoadingModal from './modals/Loading.Modal';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import login from './services/Auth.Service';
import UserModel from './models/User.Model';
import * as ExpoConstants from 'expo-constants';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    const abortController = new AbortController();

    const authenticate = async () => {
      try {
        const deviceInfo = await Notifications.getDevicePushTokenAsync();
        const authentication = await login(
          {
            password: deviceInfo.data,
            userName: ExpoConstants.default.deviceId,
          } as UserModel,
          abortController.signal
        );
        await SecureStore.setItemAsync('token', authentication.token);
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };

    authenticate();
    LogBox.ignoreAllLogs();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SongPage" component={SongPage} />

        {/* Modals */}
        <Stack.Screen
          name="LoadingModal"
          component={LoadingModal}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="RecommendationsModal"
          component={RecommendationsModal}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
