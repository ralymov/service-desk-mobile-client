import Expo from 'expo';
import React from 'react';
import {
  AppRegistry
} from 'react-native';

import {createStackNavigator, createSwitchNavigator} from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import SecuredScreen from './screens/SecuredScreen';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import TicketsList from "./screens/TicketsListScreen";

require('./config/settings');

const AppStack = createStackNavigator({Home: HomeScreen,TicketsList:TicketsList, Other: SecuredScreen});
const AuthStack = createStackNavigator({SignIn: LoginScreen});

const App = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

AppRegistry.registerComponent('service-desk-mobile-client', () => App);
export default Expo.registerRootComponent(App);