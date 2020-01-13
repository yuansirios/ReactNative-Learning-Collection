import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import FlexBoxUtil from '../../Tool/FlexBoxUtil';
import { screenW, screenH } from '../../Tool/AdapterUtil';

export default class GuideView extends Component {

    static navigationOptions = {
        gesturesEnabled: false, // 禁用手势返回
        header: null,           // 隐藏顶部导航栏
        headerBackTitle: null
    };

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                bounces={false}
                pagingEnabled={true}
                horizontal={true}>
                <View style={[styles.backgroundSize, FlexBoxUtil.row_column_center]}>
                    <Text style={[FlexBoxUtil.debugRed]}>引导页一</Text>
                </View>

                <View style={[styles.backgroundSize, FlexBoxUtil.row_column_center]}>
                    <Text style={[FlexBoxUtil.debugRed]}>引导页二</Text>
                </View>

                <View style={[styles.backgroundSize, FlexBoxUtil.row_column_center]}>
                    <Text style={[FlexBoxUtil.debugRed]}>引导页三</Text>

                    <View style={[FlexBoxUtil.debugBlue,{marginTop:200}]}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                this.props.navigation.navigate('Home');
                            }}
                        >
                            <Text style={styles.btnText}>启动应用</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        );
    }
};
var styles = StyleSheet.create({
    contentContainer: {
        width: screenW * 3,
        height: screenH,
    },
    backgroundSize: {
        width: screenW,
        height: screenH,
    },
    btnOut: {
        alignItems: 'center',
    },
    btn: {
        width: 150,
        height: 50,
        backgroundColor: '#90ee90',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        color: '#fff'
    },
});