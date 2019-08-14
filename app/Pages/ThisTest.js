import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class ThisTest extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'this&bind示例详解',
    });

    static defaultProps = {
        message: "Hello World!"
    }

    constructor(props) {
        super(props);
        this.state = {
            showAlert: true
        };

        this.onPressClick = this.onPressClick.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.item, { backgroundColor: "#718191" }]}
                    onPress={this.onErrorClick}>点我报错</Text>
                <Text style={[styles.item, { backgroundColor: "#792" }]}
                    onPress={this.onPressClick}>解决办法一</Text>
                <Text style={[styles.item, { backgroundColor: "#792" }]}
                    onPress={this.onPressClick2.bind(this)}>解决办法二</Text>
                <Text style={[styles.item, { backgroundColor: "#792" }]}
                    onPress={this.onPressClick3}>解决办法三</Text>
                <Text style={[styles.item, { backgroundColor: "#792" }]}
                    onPress={this.onPressClick4}>解决办法四</Text>
            </View>
        )
    }

    onErrorClick() {
        try {
            let show = this.state.showAlert;
            if (show) {
                alert(this.props.message);
            }
        } catch (error) {
            alert(error);
        }
    }

    onPressClick() {
        this.onErrorClick();
    }

    onPressClick2() {
        this.onErrorClick();
    }

    onPressClick3 = () => {
        this.onErrorClick();
    }

    onPressClick4 = (e) => {
        alert(e);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    item: {
        textAlign: 'center',
        fontSize: 40,
        color: "white"
    }
});