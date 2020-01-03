
import React from 'react';
import HomeList from './Pages/HomeList'
import NavTest from './Pages/NavTest'
import NavNext from './Pages/NavNext'
import FlatListTest from './Pages/FlatListTest'
import SectionListTest from './Pages/SectionListTest'
import ScrollViewTest from './Pages/ScrollViewTest'
import ButtonTest from './Pages/ButtonTest'
import ThisTest from './Pages/ThisTest'
import FetchTest from './Pages/FetchTest'
import LoginView from './Pages/LoginView'
import TextInputTest from './Pages/TextInputTest'
import ModalViewTest from './Pages/ModalViewTest'
import ImageTest from './Pages/ImageTest'
import StatusBarTest from './Pages/StatusBarTest'
import ImagePickerTest from './Pages/ImagePickerTest'
import PanResponderAPI from './Pages/PanResponderAPI'
import NetInfoAPI from './Pages/NetInfoAPI'

import LayoutAnimationComp from './Pages/Animation/LayoutAnimationComp'
import AnimatedComp from './Pages/Animation/AnimatedComp'

import { createStackNavigator, createAppContainer } from "react-navigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeList
  },
  NetInfoAPI: {
    screen: NetInfoAPI
  },
  PanResponderAPI: {
    screen: PanResponderAPI
  },
  ImagePickerTest: {
    screen: ImagePickerTest
  },
  StatusBarTest: {
    screen: StatusBarTest
  },
  AnimatedComp: {
    screen: AnimatedComp
  },
  LayoutAnimationComp: {
    screen: LayoutAnimationComp
  },
  ImageTest: {
    screen: ImageTest
  },
  ModalViewTest: {
    screen: ModalViewTest
  },
  TextInputTest: {
    screen: TextInputTest
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
  },
  ScrollView: {
    screen: ScrollViewTest
  },
  ButtonView: {
    screen: ButtonTest
  },
  ThisTest: {
    screen: ThisTest
  },
  FetchTest: {
    screen: FetchTest
  },
  LoginView: {
    screen: LoginView
  }
});

const AppContainer = createAppContainer(AppNavigator)

export default class InitApp extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    )
  }
}
