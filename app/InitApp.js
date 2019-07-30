
import React from 'react';
import { Text } from 'react-native';
import HomeList from './Pages/HomeList'
import { createStackNavigator, createAppContainer } from "react-navigation";

class WelcomePage extends React.Component {
  render() {
    return (
      <Text>Welcome</Text>
    )
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeList
  },
  Welcome:{
    screen:WelcomePage
  }
});

const AppContainer = createAppContainer(AppNavigator)

export default class InitApp extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}
