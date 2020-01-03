
import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { setSpText, scaleSizeH } from '../Tool/AdapterUtil';

export default class HomeList extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '示例详解',
    //返回文字需要在前一个页面设置
    headerBackTitle: '返回'
  });

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        { key: '导航跳转-常用设置', component: 'Navigation' },
        { key: 'FlatList详细使用', component: 'FlatList' },
        { key: 'SectionList详细使用', component: 'SectionList' },
        { key: 'ScrollView详细使用', component: 'ScrollView' },
        { key: 'Button、TouchableOpacity、state、ref', component: 'ButtonView' },
        { key: 'this & bind 详解', component: 'ThisTest' },
        { key: '网络请求示例', component: 'FetchTest' },
        { key: '实战-登录页面', component: 'LoginView' },
        { key: '输入文本框的双向绑定', component: 'TextInputTest' },
        { key: '模态框实现弹窗效果', component: 'ModalViewTest' },
        { key: 'Image图片加载和剪切', component: 'ImageTest' },
        { key: '状态栏示例', component: 'StatusBarTest' },
        { key: '默认布局动画', component: 'LayoutAnimationComp' },
        { key: 'Animated动画库', component: 'AnimatedComp' },
        { key: '拍照和相册操作', component: 'ImagePickerTest' },
        { key: '网络信息查看', component: 'NetInfoAPI' },
      ],
    };
  }
  render() {
    return (
      <SafeAreaView>
        <View style={styles.homeList}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item, index }) => this._createListItem(item, index)}
            ItemSeparatorComponent={this._separator}
          />
        </View>
      </SafeAreaView>
    );
  }

  /**
   * cell
   *
   * @param {*} item
   * @returns
   * @memberof HomeList
   */
  _createListItem(item, index) {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => this._onItemClick(item)}>
        <View style={styles.homeCell}>
          <Text style={{ color: 'white', fontSize: setSpText(30) }}>【{index}】{item.key}</Text>
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
    console.log("点击了：" + item.key);
    const { navigate } = this.props.navigation;
    navigate(item.component);
  }

}

const styles = StyleSheet.create({
  homeList: {
    backgroundColor: "#998877"
  },
  homeCell: {
    height: scaleSizeH(80),
    marginLeft: 20,
    justifyContent: "center"
  }
});