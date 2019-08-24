
import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
} from 'react-native';

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

export default class LoginView extends Component {
    static navigationOptions = () => ({
        title: '登录页面',
    });
    render() {
        return (
            <View style={styles.container}>
                {/* 头像 */}
                <Image source={require('./img/icon_head.png')}  style={styles.iconStyle}/>
                {/* 账号和密码 */}
                <TextInput placeholder='请输入用户名' clearButtonMode='always' style={styles.textInputStyle}/>
                <TextInput placeholder='请输入密码' clearButtonMode='always' password={true} style={styles.textInputStyle}/>
                {/* 登录 */}
                <View style={styles.loginBtnStyle}>
                    <Text>登录</Text>
                </View>

                {/* 设置 */}
                <View style={styles.settingStyle}>
                    <Text>无法登录</Text>
                    <Text>新用户</Text>
                </View>

                {/* 其他的登录方式 */}
                <View style={styles.otherLoginStyle}>
                    <Text>其他的登录方式：</Text>
                    <Image source={require('./img/icon_wechat.png')} style={styles.iconOtherLoginStyle} />
                    <Image source={require('./img/icon_qq.png')} style={styles.iconOtherLoginStyle} />
                    <Image source={require('./img/icon_dd.png')} style={styles.iconOtherLoginStyle} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dddddd',
        alignItems: 'center'
    },
    iconStyle: {
        marginTop: 50,
        marginBottom: 30,
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white'
    },
    textInputStyle:{
        height:38,
        backgroundColor:'white',
        marginBottom:1,
        textAlign:"center",
        width:width
    },
    loginBtnStyle:{
        height:35,
        width:width*0.8,
        backgroundColor:'blue',
        marginTop:30,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8
    },
    settingStyle:{
        flexDirection:'row',
        width:width*0.8,
        justifyContent:'space-between'
    },
    iconOtherLoginStyle:{
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    otherLoginStyle:{
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:10,
        left:20
    }
});