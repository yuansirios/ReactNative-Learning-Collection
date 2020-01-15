import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Button
} from 'react-native'

import { connect } from 'react-redux'
import { change, defaultSetting } from './Store/actionCreators'  // 导入action

class ReduxTest extends Component {

  static navigationOptions = ({
    title: 'Redux示例详解',
  });
  
  componentWillUnmount(){
    alert('页面卸载，重置状态')
    this.props.clearState()
  }

  render() {
    return (
      <View>
        <StatusBar
          translucent={true} // 设置沉浸式状态栏 正常情况下 状态栏高度为20 这里的20 需要页面元素距离最上面 paddingTop:20
          backgroundColor={'red'} // 设置状态栏颜色
          animated={true} // 允许动画切换效果
        />
        <Text>{this.props.data}</Text>
        <Button title="更新state" onPress={this.props.changeData} />
        <Button
          title="获取state"
          onPress={() => {
            console.log(this.props.data)
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})

const mapState = state => ({
  data: state.reduxTest.get('data')// immutable对象使用get获取
})

const mapDispatch = dispatch => ({
  changeData() {
    dispatch(change())
  },
  clearState() {
    dispatch(defaultSetting())
  }
})

export default connect(
  mapState,
  mapDispatch
)(ReduxTest)