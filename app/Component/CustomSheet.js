import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default class CustomSheet extends Component {
    // 入参类型校验
    static propTypes = {
        items: PropTypes.array,
        title: PropTypes.string,
        visible: PropTypes.bool,
        clickBlock: PropTypes.func
    }

    // 默认值
    static defaultProps = {
        items: [
            {
                title: '拍照',
            },
            {
                title: '录像',
            }
        ],
        title: '你需要拍照或录像？',
        visible: false
    }

    state = {
        modalVisible: this.props.visible,
    };

    // 该钩子函数表示当父组件的props入参改变时调用，常用于父组件入参变化影响子组件渲染
    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({ modalVisible: newProps.visible });
    }

    dismiss = () => {
        this.setState({ modalVisible: false });
    }

    itemClick(i){
        this.props.clickBlock(i);
        this.dismiss();
    }

    render() {
        let actionSheets = this.props.items.map((item, i) => {
            return (
                <TouchableOpacity
                    key={i}
                    style={styles.actionItem}
                    onPress={()=>{this.itemClick(i);}}>
                    <Text style={styles.actionItemTitle}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            );
        });

        return (
            <Modal
                animationType="slide"
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={this.dismiss}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.subView}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.actionTitle}>
                                {this.props.title}
                            </Text>
                            {actionSheets}
                        </View>
                        <View style={[styles.itemContainer]}>
                            <TouchableOpacity
                                style={[styles.actionItem, { borderTopWidth: 0 }]}
                                onPress={this.dismiss}>
                                <Text style={styles.actionItemTitle}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    modalStyle: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)'
    },
    subView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
        width: width,
    },
    itemContainer: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        borderRadius: 6,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionItem: {
        width: width - 30,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#cccccc',
        borderTopWidth: 0.5,
    },
    actionTitle: {
        fontSize: 13,
        color: '#808080',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    actionItemTitle: {
        fontSize: 16,
        color: '#444444',
        textAlign: 'center',
    },
});