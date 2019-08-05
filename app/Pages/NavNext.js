import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

export default class NavNext extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `参数是 with ${navigation.state.params.arg}`,
        headerLeft: (
            <Button title='返回按钮'
                onPress={() => navigation.state.params.handleSave()} />
        ),
        headerRight: (
            <Button title='右边按钮'
                onPress={() => alert('点击了右边！！！')} />
        ),
        // header: null,  //隐藏顶部导航栏
    });

    componentDidMount() {
        //左侧返回按钮需要绑定
        this.props.navigation.setParams({ handleSave: this._leftClick.bind(this) })
    }

    render() {
        const { state, goBack } = this.props.navigation;
        return (
            <View>
                <Text style={{marginTop:50}}>参数是：{state.params.arg}</Text>
                <View style={style.btn}>
                    <Button title='返回参数' color='white' onPress={() => this.back(state, goBack)} />
                </View>
            </View>
        );
    }

    back = (state, goBack) => { //把属性传递过来，然后进行使用
        state.params.callBack('this is back data ') //回调传值
        goBack() //点击POP上一个页面得方法
    }

    _leftClick = () => {
        const { state, goBack } = this.props.navigation;
        this.back(state, goBack)
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