import React, { Component } from 'react';
import { View,TextInput, StyleSheet, TouchableWithoutFeedback,Keyboard } from 'react-native';

export default class TextInputTest extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '输入文本框的双向绑定',
    });
    state = { 
        text: ''
    };
 
    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
 
    _keyboardDidShow () {
        console.log('软键盘显示');
    }
 
    _keyboardDidHide () {
        console.log('软键盘隐藏');
    }
 
    onChangeTextHandle = (value) => {
        this.setState({text: value});
    }
 
    onBlurHandle = () => {
        console.log('失去焦点');
        Keyboard.dismiss();
    }
 
    render() {
        return (
            <TouchableWithoutFeedback
                onPress={this.onBlurHandle}
            >
                <View style={styles.containerStyle}>
                    <TextInput
                        style={styles.TextInputStyle} 
                        value={this.state.text} 
                        placeholder="请输入您需要的商品"
                        placeholderTextColor='#A4A4A4'
                        onChangeText={this.onChangeTextHandle}
                        onBlur={this.onBlurHandle}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#E4E4E4'
    },
    TextInputStyle: {
        margin: 10,
        padding: 0,
        height: 50, 
        borderColor: 'green', 
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        color: '#000000',
        paddingLeft: 10,
        backgroundColor: '#FFFFFF'
    }
});