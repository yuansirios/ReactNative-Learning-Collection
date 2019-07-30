
import React from "react";
import HomeList from './Pages/HomeList'

import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeList
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
