import React from 'react';
import { View, Button, Text } from 'react-native';

//0.60.0以后不用了，用@react-native-community/netinfo
import NetInfo from "@react-native-community/netinfo";

export default class NetInfoAPI extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'NetInfo示例',
    });

    constructor(props) {
        super(props);
        NetInfo.addEventListener(state => {
            this.setInfo(state);
        });
    }

    state = {
        type: null,
        isConnected: ''
    }

    setInfo(state){
        this.setState({
            type: state.type,
            isConnected: state.isConnected ? 'online' : 'offline'
        })
    }

    // 检测网络状态
    checkNet = () => {
        NetInfo.fetch().then(state => {
            this.setInfo(state);
        });
    }

    render() {
        return (
            <View>
                <Text>类型：{this.state.type}</Text>
                <Text>状态：{this.state.isConnected}</Text>
                <Button onPress={this.checkNet} title='查看信息'></Button>
            </View>
        );
    }
}
