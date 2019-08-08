import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

export default class ButtonTest extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Button示例详解',
    });

    static defaultProps = {
        //默认属性
    }

    constructor(props) {
        super(props);
        this.state = {
            greenEnable: true
        };
    }

    render() {
        let gEnable = this.state.greenEnable
        let yEnable = this.state.yellowEnable
        return (
            <View style={styles.container}>
                {/* 设置Style没用，点击区域只在文字上 */}
                <View style={[styles.greenBtn, styles.center]}>
                    <Button
                        onPress={this._onPress}
                        title={gEnable ? "绿色的按钮" : "按钮不可用"}
                        color="#FFFFFF"
                        disabled={!gEnable} />
                </View>

                {/* 带图标的黄色按钮 */}
                <TouchableOpacity
                    ref='yellowBtn'
                    style={[styles.yellowBtn, styles.center, { flexDirection: 'row' }]}
                    onPress={this._onPress}
                    //长按设置
                    delayLongPress={1000}
                    onLongPress={this._onLongPress}
                    //点击后的背景透明度
                    activeOpacity={0.5}>
                    <View style={{ width: 20, height: 20, backgroundColor: 'green' }} />
                    <Text style={{ paddingLeft: 10 }}>带图标的黄色按钮</Text>
                </TouchableOpacity>

                {/* 点击变绿色的红色按钮 */}
                <TouchableHighlight
                    style={[styles.redBtn, styles.center]}
                    onPress={this._onPress}
                    underlayColor='green'>
                    <Text style={{ paddingLeft: 10 }}>点击变绿色的红色按钮</Text>
                </TouchableHighlight>

                {/* 回调Alert要bind */}
                <Button
                    onPress={this._onStatePress.bind(this)}
                    title="state示例"
                    color="red" />

                <Button
                    onPress={this._onRefPress.bind(this)}
                    title="ref示例"
                    color="green" />

            </View>
        )
    }

    _onPress() {
        alert('点我')
    }

    _onLongPress() {
        alert('长按')
    }

    _onStatePress() {
        Alert.alert(
            'ref示例',
            '',
            [
                { text: '绿色按钮不可用', onPress: this._gBtnUnable.bind(this) },
                { text: '绿色按钮可用', onPress: this._gBtnEnable.bind(this) },
                { text: '取消' }
            ],
            { cancelable: true }
        )
    }

    _onRefPress() {
        Alert.alert(
            'ref示例',
            '',
            [
                { text: '黄色按钮不可用', onPress: this._yBtnUnable.bind(this) },
                { text: '黄色按钮可用', onPress: this._yBtnEnable.bind(this) },
                { text: '取消' }
            ],
            { cancelable: true }
        )
    }

    _gBtnEnable() {
        this.setState({
            greenEnable: true
        });
    }

    _gBtnUnable() {
        this.setState({
            greenEnable: false
        });
    }

    _yBtnEnable() {
        this.refs.yellowBtn.setNativeProps({
            style: {
                backgroundColor: 'yellow',
                width: '80%',
                borderColor: '#000000',
            },
            // 属性设置无效
            disabled: false
        });
    }

    _yBtnUnable() {
        this.refs.yellowBtn.setNativeProps({
            style: {
                backgroundColor: 'grey',
                width: '60%',
                borderColor: 'yellow',
            },
            // 属性设置无效
            disabled: true
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    greenBtn: {
        backgroundColor: 'green',
        width: '80%',
        height: 50
    },
    yellowBtn: {
        width: '80%',
        height: 50,
        backgroundColor: 'yellow',
        borderRadius: 5,
        borderColor: '#000000',
        borderWidth: 1
    },
    redBtn: {
        width: '80%',
        height: 50,
        backgroundColor: 'red'
    },
    welcome: {
        marginTop: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});