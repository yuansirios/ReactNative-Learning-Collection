import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';

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

export default class ScrollViewTest extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'ScrollView示例详解',
    });

    static defaultProps = {
        duration: 2000
    }

    //关闭页面，释放定时器
    componentWillUnmount(){
        this.onScrollerBeginDrag()
    }

    constructor(props) { 
        super(props);
        this.state = {
            currentPage: 0
        };
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
                
                <ScrollView ref="scrollerView"
                    style={{}}
                    // 水平滚动
                    horizontal={true}
                    // 是否显示水平滚动条
                    showsHorizontalScrollIndicator={false}
                    // 安页滚动
                    pagingEnabled={true}
                    //滚动动画结束时调用此函数
                    onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
                    //开始拖拽
                    onScrollBeginDrag={(e) => this.onScrollerBeginDrag(e)}
                    //停止拖拽
                    onScrollEndDrag={(e) => this.onScrollEndDrag(e)}
                >
                    {this.creatImages()}
                </ScrollView>
                {/*底部页面指示器*/}
                <View style={styles.pageViewStyle}>
                    {/*返回5个圆点*/}
                    {this.renderPageIndex()}
                </View>
            </View>
        )
    }

    // 开始拖拽时调用
    onScrollerBeginDrag() {
        // 停止定时器
        clearInterval(this.timer);
    }
    // 停止拖拽时调用
    onScrollEndDrag() {
        // 开启定时器
        this.startTime();
    }
    // 复杂操作
    componentDidMount() {
        // debugger
        // 开启定时器
        this.startTime();
    }

    // 开启定时器
    startTime() {
        // 1.拿到scrollerView
        let scrollerView = this.refs.scrollerView;
        let imageCount = ImageData.length;
        // 2.添加定时器
        // 2.1 设置圆点
        let activePage = 0;
        this.timer = setInterval(() => {
            // 2.2 判断
            if ((this.state.currentPage + 1) >= imageCount) {
                activePage = 0;
            } else {
                activePage = this.state.currentPage + 1;
            }
            // 2.3 更新状态机
            this.setState({
                // 当前页
                currentPage: activePage
            })
            // 2.4 让scrollerVeiw滚动起来
            let offsetX = activePage * width;
            scrollerView.scrollTo({ x: offsetX, y: 0, animated: true });
        }, this.props.duration);
    }

    //返回所有的图片
    creatImages() {
        //数组
        let allImage = [];
        //拿到图形数组
        let imageArrs = ImageData;
        //遍历
        for (var i = 0; i < imageArrs.length; i++) {
            //取出每一个单独的对象
            var imageItem = imageArrs[i];
            //创建组件放入数组
            allImage.push(
                <Image key={i} backgroundColor={imageItem.img} style={styles.imageStyle} >
                </Image>
            );
        }
        // 返回数组
        return allImage;
    }
    // 返回页面指示器的圆点
    renderPageIndex() {
        // 数组
        let indicatorArr = [];
        //拿到图形数组
        let imageArrs = ImageData;
        //样式
        var style;
        //遍历
        for (var i = 0; i < imageArrs.length; i++) {
            // 判断
            style = (i == this.state.currentPage) ? { color: 'orange' } : { color: '#E8E8E8' }


            //放入圆点
            indicatorArr.push(
                // 多个样式使用[]数组来放
                <Text key={i} style={[{ fontSize: 25 }, style]}>•</Text>
            );
        }
        //返回
        return indicatorArr;
    }

    // 当一帧滚动结束的时候调用
    onAnimationEnd(e) {
        // 1.求出水平方向的偏移量
        var offsetX = e.nativeEvent.contentOffset.x;

        // 2.求出当前的页数         floor函数 取整
        var currentPage = Math.floor(offsetX / width);

        // 3.更新状态机
        this.setState({
            // 当前页
            currentPage: currentPage
        })

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