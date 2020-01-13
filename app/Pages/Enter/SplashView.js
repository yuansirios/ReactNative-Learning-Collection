
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DeviceStorage from './DeviceStorage';

import FlexBoxUtil from '../../Tool/FlexBoxUtil';

export default class SplashView extends Component {

    static navigationOptions = {
        tabBarVisible: false, // 隐藏底部导航栏
        header: null,         // 隐藏顶部导航栏
        headerBackTitle: null
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.timer = setTimeout(() => {
            DeviceStorage.get('isFrist').then((result) => {
                if (result == null || result == '') {
                    //第一次启动 
                    this.props.navigation.navigate('GuideView');
                    DeviceStorage.save('isFrist', 'true')
                } else {
                    //第二次启动s
                    this.props.navigation.navigate('Home');
                }
            }).catch((error) => {
                console.log('==========================');
                console.log('系统异常' + error);
                console.log('==========================');
            });
        }, 3000);
    }

    componentWillUnmount() {
        this.timer = null;
    }

    render() {
        return (
            <View style={[
                FlexBoxUtil.row_column_center,
                { flex: 1 }
            ]}>
                <Text style={FlexBoxUtil.debugGreen}>我是启动页,3s后跳转</Text>
            </View>
        );
    }
}