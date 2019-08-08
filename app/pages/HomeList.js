
import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class HomeList extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '示例详解',
    //返回文字需要在前一个页面设置
    headerBackTitle:'返回' 
  });

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        { key: '1、导航跳转-常用设置', component: 'Navigation' },
        { key: '2、FlatList详细使用', component: 'FlatList' },
        { key: '3、SectionList详细使用', component: 'SectionList' },
        { key: '4、ScrollView详细使用', component: 'ScrollView' },
        { key: '5、Button、TouchableOpacity、state、ref', component: 'ButtonView' },
        { key: '6、TabBar常用设置', component: '123' },
        { key: '7', component: '123' },
        { key: '8', component: '123' },
        { key: '9', component: '123' },
        { key: '10', component: '123' },
      ],
    };
  }
  render() {
    return (
      <View style={styles.homeList}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => this._createListItem(item)}
          ItemSeparatorComponent={this._separator}
        />
      </View>
    );
  }

  /**
   * cell
   *
   * @param {*} item
   * @returns
   * @memberof HomeList
   */
  _createListItem(item) {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => this._onItemClick(item)}>
        <View style={styles.homeCell}>
          <Text style={{color:'white'}}>{item.key}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  /**
   *  分割线
   *  
   * @returns
   * @memberof HomeList
   */
  _separator() {
    return <View style={{ height: 1, backgroundColor: '#999999' }} />;
  }

  /**
   * item点击事件
   *
   * @param {*} item
   * @memberof HomeList
   */
  _onItemClick(item) {
    console.log("点击了："+item.key);
    const {navigate} = this.props.navigation;
    navigate(item.component);
  }

}

const styles = StyleSheet.create({
  homeList: {
    backgroundColor: "#998877"
  },
  homeCell: {
    height: 50,
    marginLeft:20,
    justifyContent: "center"
  }
});