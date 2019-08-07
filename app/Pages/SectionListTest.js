import React, { Component } from 'react';
import {
    View,
    Text,
    SectionList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class SectionListTest extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'SectionList示例详解',
    });

    _keyExtractor = (item, index) => item + index;

    _renderSectionHeader = (info) => {
        let section = info.section.key;
        return (<Text
            style={styles.sectionStyle}>{section}</Text>
        )
    };

    _renderListHeader = () => {
        return (
            <View style={styles.headOrFooter}>
                <Text>头部</Text>
            </View>
        );
    };

    _renderListFooter = () => {
        return (
            <View style={styles.headOrFooter}>
                <Text>尾部</Text>
            </View>
        );
    };

    _renderSeparator = () => {
        return (
            <View style={{ backgroundColor: '#000000', height: 1 }}></View>
        );
    };

    _renderItem = (info) => {
        let item = info.item.name;
        return (
            <TouchableOpacity 
            activeOpacity={0.5} 
            style={styles.itemStyle}
            onPress={() => this._itemPress(info)}>
                <Text>{item}</Text>
            </TouchableOpacity>
        )
    };

    _itemPress(info){
        let msg = '点击了' + info.section.key + info.item.name;
        alert(msg)
    };

    render() {
        let sections = [
            { typeName: "第一组", persons: [{ name: "1-1" }] },
            { typeName: "第二组", persons: [{ name: "2-1" }, { name: "2-2" }] },
            { typeName: "第三组", persons: [{ name: "3-1" }, { name: "3-2" }, { name: "3-2" }] }];

        //这里要对数组转换一下，
        // 因为SectionList要求item必须是data的数组，
        // 如果把data写成其他单词则会报错
        //不管你是否使用一个或多个不同的section，都要重新定义以下section如：
        // tempData.key = item.typeName;    
        // temData.key =`${item.typeName} ${item.typeNameEn}`
        //   tempData.typeName = item.typeName; tempData.key = item.typeNameEn
        let tempArr = sections.map((item, index) => {
            let tempData = {};
            tempData.key = item.typeName;
            tempData.data = item.persons;
            return tempData
        });

        return (
            <View style={{ flex: 1 }}>
                <SectionList
                    sections={tempArr}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSectionHeader}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListHeaderComponent={this._renderListHeader}
                    ListFooterComponent={this._renderListFooter}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headOrFooter: {
        backgroundColor: '#25B960',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    itemStyle: {
        height: 60,
        justifyContent: 'center',
        marginLeft: 20 ,
        backgroundColor: "#ffffff",
        color: '#5C5C5C',
        fontSize: 15
    },
    sectionStyle: {
        paddingTop:10,
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#9CEBBC',
        color: 'white',
        fontSize: 30
    }
});
