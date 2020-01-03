import React from 'react';
import { View, Text, Modal, StyleSheet, Button } from 'react-native';
import CustomSheet from '../Component/CustomSheet';
import CustomModal from '../Component/CustomModal';

export default class ModalViewTest extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '模态框实现弹窗效果',
    });

    state = {
        CustomVisible: false,
        sheetVisible: false
    };

    _openModalWin = () => {
        this.setState({ CustomVisible: true, sheetVisible: false });
    }

    _openSheet = () => {
        this.setState({ CustomVisible: false, sheetVisible: true });
    }

    _sheetClick = (e) => {
        console.warn(e);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentStyle}>
                    <Text style={styles.contentTextStyle}>
                        Modal弹框
                    </Text>
                    <Button
                        title="打开Modal窗口"
                        color="#841584"
                        onPress={this._openModalWin}
                    />
                    <Button
                        title="打开自定义Sheet窗口"
                        color="#841584"
                        onPress={this._openSheet}
                    />
                </View>

                <CustomModal visible={this.state.CustomVisible}
                    title='我是标题' />
                <CustomSheet
                visible={this.state.sheetVisible}  
                clickBlock={this._sheetClick}/>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentStyle: {
        padding: 30
    },
    contentTextStyle: {
        textAlign: 'center',
        fontSize: 26
    }
});