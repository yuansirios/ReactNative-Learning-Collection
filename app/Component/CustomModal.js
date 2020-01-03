import React from 'react';
import { View, Text, Modal, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

export default class CustomModal extends React.Component {
    // 入参类型
    static propTypes = {
        modalTitle: PropTypes.string,
        visible: PropTypes.bool
    }

    // 默认值
    static defaultProps = {
        modalTitle: '我是标题',
        visible: false
    }

    state = {
        modalVisible: this.props.visible,
    };

    // 该钩子函数表示当父组件的props入参改变时调用，常用于父组件入参变化影响子组件渲染
    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({ modalVisible: newProps.visible });
    }

    cancelModal = () => {
        this.setState({ modalVisible: false });
    }

    render() {
        return (
            <Modal
                animationType='fade' // 指定了 modal 的动画类型。类型：slide 从底部滑入滑出|fade 淡入淡出|none 没有动画
                transparent={true} // 背景是否透明，默认为白色，当为true时表示背景为透明。
                visible={this.state.modalVisible} // 是否显示 modal 窗口
                onRequestClose={() => this.setState({ modalVisible: false })} // 回调会在用户按下 Android 设备上的后退按键或是 Apple TV 上的菜单键时触发。请务必注意本属性在 Android 平台上为必填，且会在 modal 处于开启状态时阻止BackHandler事件
                onShow={() => { console.log('modal窗口显示了'); }} // 回调函数会在 modal 显示时调用
            >
                <View style={styles.modalLayer}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitleStyle}>{this.props.modalTitle}</Text>
                        <View style={styles.modalButtonStyle}>
                            <Button
                                title='取消'
                                color="#A4A4A4"
                                onPress={this.cancelModal}
                            ></Button>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalLayer: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        flex: 1,
        justifyContent: 'center',
        padding: 32
    },
    modalContainer: {
        height: 300,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    modalTitleStyle: {
        textAlign: 'center',
        fontSize: 26
    },
    modalButtonStyle: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 10
    }
});