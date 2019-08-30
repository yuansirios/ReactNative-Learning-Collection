import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';

import YSAutoBanner from '../Component/YSAutoBanner'

let Dimensions = require('Dimensions');
let { width, height } = Dimensions.get('window');
let ImageData = [
    {
        "img": '#ff9991',
        "title": "你那一笑倾国倾城"
    },
    {
        "img": '#ff1191',
        "title": "那里记录了最唯美的爱情故事"
    },
    {
        "img": '#ffff91',
        "title": "我怎么是个剩女"
    }];

class ScrollItemView extends Component {
    static defaultProps = {
        color: '#ff9991',
        width: 200,
        height: 100,
        alignSelf: ''
    }

    render() {
        let align = this.props.alignSelf;
        return (
            <View style={[styles.view, { alignSelf: align, backgroundColor: this.props.color, width: this.props.width, height: this.props.height }]}>
                <Text>{this.props.width}*{this.props.height}</Text>
            </View>
        )
    }
}

var list = [{
    "img": "http://hsjry.oss-cn-hangzhou.aliyuncs.com/car/s50ev%EF%BC%8D%E5%8F%B3%E4%BE%A7135%E5%BA%A6-%E5%9B%9B%E8%89%B2%E5%88%86%E5%B1%82.png",
    "title": "图1"
},
{
    "img": "http://hsjry.oss-cn-hangzhou.aliyuncs.com/car/s50ev%EF%BC%8D%E6%AD%A3%E5%89%8D-%E5%9B%9B%E8%89%B2%E5%88%86%E5%B1%82.png",
    "title": "图2"
},
{
    "img": "http://image.jingzhengu.com/Vehicle/logo/model/4501_904.jpg",
    "title": "图3"
},
{
    "img": "http://image.jingzhengu.com/Vehicle/logo/model/4501_904.jpg",
    "title": "图4"
},
{
    "img": "http://hsjry.oss-cn-hangzhou.aliyuncs.com/car/s50ev%EF%BC%8D%E5%8F%B3%E4%BE%A7135%E5%BA%A6-%E5%9B%9B%E8%89%B2%E5%88%86%E5%B1%82.png",
    "title": "图5"
}];

export default class ScrollViewTest extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'ScrollView示例详解',
    });

    static defaultProps = {
        duration: 2000
    }
    
    constructor(props) { 
        super(props);
        this.state = {
            currentPage: 0
        };
    }

    componentWillUnmount() {
        console.log("%s", "ScrollViewTest 释放");
    }

    render() {
        return (
            <View>
                <ScrollView style={{ backgroundColor: '#779912', height: 300 }}>
                    <ScrollItemView color='#dd9911' width={200} height={100} />
                    <ScrollItemView color='#aa9911' width={300} height={200} alignSelf='flex-end' />
                    <ScrollItemView color='#fb7111' width={100} height={100} alignSelf='center' />
                    <ScrollItemView color='#dd9911' width={200} height={100} />
                </ScrollView>

                <Text>轮播图示例</Text>
                <YSAutoBanner imageDataArr={list}/>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: width,
        height: 150
    },
    pageViewStyle: {
        width: width,
        paddingLeft: 10,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flexDirection: 'row',
        alignItems: 'center'
    }

});