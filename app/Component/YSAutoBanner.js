import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';

var Dimensions = require('Dimensions');
var { width } = Dimensions.get('window');

export default class YSAutoBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //当前页面
            currentPage: 0,
            title: this.props.imageDataArr[0].title
        }
    }

    static defaultProps = {
        //每隔多少时间
        duration: 1000,
        imageDataArr:[]
    }

    //注意大小写
    componentWillUnmount() {
        console.log("%s", "YSAutoBanner 释放");
        this.clearInterval();
    }

    //实现一些复杂的操作
    componentDidMount() {
        //开启定时器
        this.startTimer();
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    //隐藏水平滚动条
                    showsHorizontalScrollIndicator={false}
                    //自动分页
                    pagingEnabled={true}
                    //当一帧滚动结束
                    onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
                    //开始拖拽
                    onScrollBeginDrag={this.onScrollBeginDrag.bind(this)}
                    //停止拖拽
                    onScrollEndDrag={this.onScrollEndDrag.bind(this)}
                >
                    {this.renderAllImage()}
                </ScrollView>
                <View style={styles.pageViewStyle}>
                    <Text style={[{ fontSize: 20, color: 'white',marginLeft:5 }]}>{this.state.title}</Text>
                    <View style={{ flexDirection: 'row',marginRight:5 }}>
                        {this.renderPageCircle()}
                    </View>
                </View>
            </View>
        );
    }

    //开始拖拽
    onScrollBeginDrag() {
        //停止定时器
        this.clearInterval();
    }

    //停止拖拽
    onScrollEndDrag() {
        //开启定时器
        this.startTimer();
    }

    //开启定时器
    startTimer() {

        //1.拿到scrollView
        var scrollView = this.refs.scrollView;
        var imgCount = this.props.imageDataArr.length;

        //2.添加定时器 this.timer --> 可以理解成一个隐式的全局变量
        this.timer = setInterval(() => {
            //2.1设置圆点
            var activePage = 0;
            //2.2判断
            if ((this.state.currentPage + 1) >= imgCount) {
                activePage = 0;
            } else {
                activePage = this.state.currentPage + 1;
            }

            //2.3更新状态机
            this.setState({
                currentPage: activePage
            });

            //2.4让scrollView滚动起来
            var offsetX = activePage * width;
            scrollView.scrollResponderScrollTo({ x: offsetX, animated: true });
        }, this.props.duration);
    }

    clearInterval() {
        this.timer && clearInterval(this.timer);
    }

    //返回所有的图片
    renderAllImage() {
        var allImage = [];
        var imgsArr = this.props.imageDataArr;
        for (var i = 0; i < imgsArr.length; i++) {
            var imgItem = imgsArr[i];
            allImage.push(
                <Image key={i} source={{ uri: imgItem.img }} style={{ width: width, height: 120 }} />
            );
        }
        return allImage;
    }

    //返回所有的圆点
    renderPageCircle() {
        var indicatorArr = [];
        var style;
        var imgsArr = this.props.imageDataArr;
        for (var i = 0; i < imgsArr.length; i++) {
            style = (i == this.state.currentPage) ? { color: 'orange' } : { color: '#ffffff' };
            indicatorArr.push(
                <Text key={i} style={[{ fontSize: 25, marginTop: -4 }, style]}>&bull;</Text>
            );
        }
        return indicatorArr;
    }

    //当一帧滚动结束的时候调用
    onAnimationEnd(e) {
        //1、算出水平方向的偏移量
        var offSetX = e.nativeEvent.contentOffset.x;

        //2、求出当前的页数
        var currentPage = Math.floor(offSetX / width);

        //3、更新状态机，重新绘制UI
        this.setState({
            currentPage: currentPage,
            title: this.props.imageDataArr[currentPage].title
        });
    }
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 20
    },

    pageViewStyle: {
        width: width,
        height: 25,
        backgroundColor: 'rgba(0,0,0,0.4)',

        //定位
        position: 'absolute',
        bottom: 0,

        //设置主轴方向
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

});