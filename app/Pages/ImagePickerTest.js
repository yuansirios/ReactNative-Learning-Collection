import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

const options = {
    title: '选择图片',
    quality: 0.8,
    tintColor: 'green',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: true,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class ImagePickerTest extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '拍照和相册示例',
    });

    state = {
        imageSource: require('./img/icon_wechat.png')
    }

    setImageSource(response) {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            const source = { uri: response.uri };

            // You can also display the image using data:
            //   const source = { uri: 'data:image/jpeg;base64,' + response.data };

            this.setState({
                imageSource: source,
            });
        }
    }

    getImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            this.setImageSource(response);
        });
    }

    takePhoto = () => {
        ImagePicker.launchCamera(options, (response) => {
            this.setImageSource(response);
        });
    }

    takePhotoFromLibrary = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            this.setImageSource(response);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 200, height: 200 }}
                    source={this.state.imageSource}
                    resizeMode='contain' // 决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小，值为枚举类型：enum('cover', 'contain', 'stretch', 'repeat', 'center')
                />
                <Button
                    title='获取照片'
                    onPress={this.getImage}
                />
                <Button
                    title='拍照'
                    onPress={this.takePhoto}
                />
                <Button
                    title='从相册获取'
                    onPress={this.takePhotoFromLibrary}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});