import React, { Component } from 'react';
import { View, Image, StyleSheet, Button,ImageEditor,Text } from 'react-native';

const ImageUrl = 'http://hsjry.oss-cn-hangzhou.aliyuncs.com/car/s50ev%EF%BC%8D%E5%8F%B3%E4%BE%A7135%E5%BA%A6-%E5%9B%9B%E8%89%B2%E5%88%86%E5%B1%82.png';
const LocalImage = './img/icon_wechat.png';
const cropData = {
    offset: { x: 10, y: 30 },//从原图裁剪的起始坐标
    size: { width: 250, height: 250 },//裁剪的宽高
    displaySize: { width: 250, height: 250 },//裁剪后生成图片的大小
    resizeMode: 'contain', //缩放图像时使用的调整大小模式
    //cover模式只求在显示比例不失真的情况下填充整个显示区域。可以对图片进行放大或者缩小，超出显示区域的部分不显示， 也就是说，图片可能部分会显示不了。
    //contain模式是要求显示整张图片, 可以对它进行等比缩小, 图片会显示完整,可能会露出Image控件的底色。
    //stretch模式不考虑保持图片原来的宽,高比.填充整个Image定义的显示区域,这种模式显示的图片可能会畸形和失真。
};

export default class ImageTest extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Image图片加载和剪切',
    });

    state = {
        imgURI: ImageUrl,
        cropImgURI: null
    }

    componentDidMount() {
        //剪切只能用于远称图片
        ImageEditor.cropImage(this.state.imgURI, cropData, this.cropSuccess, this.cropFail);
    }

    cropSuccess = (corpImgURI) => {
        console.log('图片剪辑成功');
        this.setState({ cropImgURI: corpImgURI });
    }

    cropFail = () => {
        console.log('图片剪辑失败');
    }

    // Image.getSize(uri, success, [failure]);
    // 该方法用于获取网络图片的尺寸，而且会缓存图片至本地
    _getSize = () => {
        Image.getSize(ImageUrl, (width, height) => {
            console.log(width);
            console.log(height);
        }, (error) => {
            console.log(error);
        });
    };

    // 该方法用于获取本地静态图片的尺寸
    _resolveAssetSource = () => {
        const localImageInfo = Image.resolveAssetSource(require(LocalImage));
        console.log(localImageInfo);
    }

    // 预加载图片一个远程图片，返回一个Promise对象
    _prefetch = () => {
        Image
            .prefetch(ImageUrl)
            .then((response) => {
                console.log('预加载成功:', response);
            }, (error) => {
                console.log('预加载失败:', error);
            });
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <Text>剪辑前：</Text>
                <Image
                    style={{ width: 200, height: 200 }}
                    // source={require('../../assets/images/watch.jpg')} // 图片源数据（远程 URL 地址或本地数据）
                    source={{ uri: ImageUrl }}
                    blurRadius={0} // 为图片添加一个模糊滤镜，值越大图片越模糊，默认值为0
                    onLayout={(e) => { console.log(e.nativeEvent); }} // 当元素加载完成或者布局改变的时候调用，获取图片的信息坐标和宽高。参数为：{nativeEvent: {layout: {x, y, width, height}}}.
                    onLoadStart={() => { }} // 开始加载时触发该函数
                    onLoadEnd={() => { }} // 加载结束后，不论成功还是失败，都触发该函数
                    onLoad={() => { }} // 加载成功时触发该函数
                    onError={() => { }} // 加载失败时触发该函数
                    resizeMode='contain' // 决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小，值为枚举类型：enum('cover', 'contain', 'stretch', 'repeat', 'center')
                    defaultSource={require(LocalImage)} // 在读取图片时默认显示的图片，只能是本地静态图片。在android上调试模式将不会生效
                />
                <Text>剪辑后：</Text>
                <Image
                    source={{ uri: this.state.cropImgURI }}
                    style={styles.imgStyle}
                    resizeMode="contain"
                />
                <Button
                    title='获取网络图片尺寸并预加载'
                    onPress={this._getSize}
                />
                <Button
                    title='获取本地图片尺寸'
                    onPress={this._resolveAssetSource}
                />
                <Button
                    title='仅预加载'
                    onPress={this._prefetch}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4E4E4'
    },
    imgStyle: {
        width: 200,
        height: 200
    }
});