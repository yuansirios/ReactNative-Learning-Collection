
import React from 'react';
import HomeList from './Pages/HomeList'
import NavTest from './Pages/NavTest'
import NavNext from './Pages/NavNext'
import FlatListTest from './Pages/FlatListTest'
import SectionListTest from './Pages/SectionListTest'

import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeList
  },
  Navigation: {
    screen: NavTest
  },
  Navigation2: {
    screen: NavNext
  },
  FlatList: {
    screen: FlatListTest
  },
  SectionList: {
    screen: SectionListTest
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
