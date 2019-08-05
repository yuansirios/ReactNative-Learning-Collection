import React, { Component } from 'react';
import {
    View,
    Button,
    Alert,
    StyleSheet
} from 'react-native';

export default class NavTest extends Component {
    static navigationOptions = {
        title: '导航栏设置',
        headerTintColor: 'green',
    };
    render() {
        return (
            <View style={style.btn}>
                <Button title='1、传递参数' color='white' onPress={() => this._itemClick(1)} />
            </View>
        );
    }

    _itemClick(value) {
        var str = "点击了：" + value;
        alert(str);

        const { navigate } = this.props.navigation;
        navigate('Navigation2',
            { arg: 'yuan', callBack: (backData) => { alert(backData) } });
    }
}

const style = StyleSheet.create({
    btn: {
        height: 50,
        margin: 20,
        marginBottom: 0,
        justifyContent: "center",
        backgroundColor: 'green',
    }
});