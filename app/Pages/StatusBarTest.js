import React from 'react';
import {    
    StyleSheet,
    View,
    StatusBar,
    Text,
    Button
} from 'react-native';
 
export default class StatusBarTest extends React.Component{

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '状态栏示例',
    });

    constructor(props){
        super(props);
        this.state = {
            animated: true,
            hidden: false,
            backgroundColor:'white',
            barStyle: 'dark-content',
            translucent:false,
            networkActivityIndicatorVisible:false,
            showHideTransition:'fade',
        };
    }
 
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={this.state.animated} // 指定状态栏的变化是否应以动画形式呈现。
                    barStyle={this.state.barStyle} // 设置状态栏文本的颜色。枚举类型：'default'|'light-content'|'dark-content'
                    hidden={this.state.hidden} // 是否隐藏状态栏
                    backgroundColor={this.state.backgroundColor} // (android)状态栏的背景色
                    translucent={this.state.translucent} // (android)指定状态栏是否透明。设置为true时，应用会延伸到状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用
                    networkActivityIndicatorVisible={this.state.networkActivityIndicatorVisible} // (ios)指定是否显示网络活动提示符
                    showHideTransition={this.state.showHideTransition} // (ios)通过hidden属性来显示或隐藏状态栏时所使用的动画效果。默认值为'fade'
                />
                <View style={styles.viewStyle}>
                    <Text>动画过渡：</Text>
                    <Button 
                        title={this.state.animated ?'禁用动画':'使用动画'} 
                        onPress={() => { this.setState({ animated:!this.state.animated }); }}
                    />
                </View>
                <View style={styles.viewStyle}>
                    <Text>隐藏/显示：</Text>
                    <Button 
                        title={this.state.hidden?'显示':'隐藏'} 
                        onPress={() => { this.setState({ hidden:!this.state.hidden }); }}
                    />
                </View>
                <View style={styles.viewStyle}>
                    <Text>设置背景色(android)：</Text>
                    <Button title='红色' onPress={()=>{this.setState({backgroundColor:'red'});}}/>
                    <Button title='蓝色' onPress={()=>{this.setState({backgroundColor:'blue'});}}/>
                    <Button title='灰色' onPress={()=>{this.setState({backgroundColor:'gray'});}}/>
                </View>
                <View style={styles.viewStyle}>
                    <Text>状态栏了占位(透明时不占位置,android)：</Text>
                    <Button 
                        title={this.state.translucent?'不透明':'透明'} 
                        onPress={()=>{this.setState({translucent:!this.state.translucent});}}
                    />
                </View>
                <View style={styles.viewStyle}>
                    <Text>设置文本样式：</Text>
                    <Button title='default' onPress={()=>{this.setState({barStyle:'default'})}}/>
                    <Button title='light-content' onPress={()=>{this.setState({barStyle:'light-content'});}}/>
                    <Button title='dark-content' onPress={()=>{this.setState({barStyle:'dark-content'});}}/>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>显示或隐藏动画效果(ios)：</Text>
                    <Button title='fade' onPress={()=>{this.setState({showHideTransition:'fade'});}}/>
                    <Button title='slide' onPress={()=>{this.setState({showHideTransition:'slide'});}}/>
                </View>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});