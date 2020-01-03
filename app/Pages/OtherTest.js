import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    ActionSheetIOS,
    StyleSheet
} from 'react-native';

var BUTTONS = [
    'Option 0',
    'Option 1',
    'Option 2',
    'Delete',
    'Cancel',
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class OtherTest extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '常用组件示例',
    });

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.itemFont, { backgroundColor: "#718191" }]}
                    onPress={this.showAlert}>Click to show the Alert</Text>
                <Text style={[styles.itemFont, { backgroundColor: "#792" }]}
                    onPress={this.showActionSheet}>Click to show the ActionSheet</Text>
            </View>
        )
    }

    showAlert({ title = 'Title', message = 'Message' }) {
        Alert.alert(
            title,
            message,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                { text: 'OK', onPress: () => console.log('OK Pressed!') },
            ]
        )
    }

    showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            tintColor: 'green',
        },
            (buttonIndex) => {
                var title = '选中了'+BUTTONS[buttonIndex];
                this.showAlert({ title: title });
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
    itemFont: {
        textAlign: 'center',
        fontSize: 24,
        color: "white"
    }
});