import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    SegmentedControlIOS
} from 'react-native';

let totalPage = 3;//总的页数

class FlatListItem extends PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <TouchableOpacity
                {...this.props}
                onPress={this._onPress}
                style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}
            >
                <Text>{this.props.selected ? "选中了" : ""}{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

class FlatHeadView extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <SegmentedControlIOS
                    values={['分页加载', '动态行高']}
                    selectedIndex={0}
                    onChange={this._onChange.bind(this)}
                />
            </View>
        )
    }

    _onChange = (event) => {
        let index = event.nativeEvent.selectedSegmentIndex
        this.props.didChange(index)
    }
}

//解决navigationOptions拿不到this
let that;

export default class FlatListTest extends PureComponent {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: <FlatHeadView didChange={(index) => that.getSegmentIndex(index)} />
    });

    constructor(props) {
        super(props);
        that = this;

        this.state = {
            page: 1,
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing: false,//下拉控制
            selected: (new Map()),
            selectedIndex: 0
        };
    }

    componentDidMount() {
        this._fetchData();
    }

    render() {
        if (this.state.selectedIndex == 0) {
            //第一次加载等待的view
            if (this.state.isLoading && !this.state.error) {
                return this._renderLoadingView();
            } else if (this.state.error) {
                //请求失败view
                return this.renderErrorView();
            }
            //加载数据
            return this._renderLeftList();
        } else {
            return this._renderRightList();
        }
    }

    getSegmentIndex(index) {
        this.setState({
            selectedIndex: index
        })
    }

    //加载等待页
    _renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    color='blue'
                    size="large"
                />
            </View>
        );
    }

    //加载失败view
    _enderErrorView() {
        return (
            <View style={styles.container}>
                <Text>
                    {this.state.errorInfo}
                </Text>
            </View>
        );
    }

    /**
    * 此函数用于为给定的item生成一个不重复的Key。
    * Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
    * 若不指定此函数，则默认抽取item.key作为key值。
    * 若item.key也不存在，则使用数组下标
    *
    * @param item
    * @param index
    * @private
    */
    // 这里指定使用数组下标作为唯一索引
    _keyExtractor = (item, index) => index;

    //渲染分页视图 
    _renderLeftList() {
        return (
            <FlatList
                data={this.state.dataArray}
                renderItem={this._renderItemView}
                keyExtractor={this._keyExtractor}
                onEndReached={this._onEndReached}
                ListHeaderComponent={this._renderHeader}
                ListFooterComponent={this._renderFooter}
                ItemSeparatorComponent={this._renderItemSeparatorComponent}
                ListEmptyComponent={this._renderEmptyView}
                onRefresh={this._renderRefresh}
                refreshing={this.state.isRefreshing}
                // 实现PureComponent时使用
                extraData={this.state.selected}
                // 决定当距离内容最底部还有多远时触发onEndReached回调；数值范围0~1，例如：0.5表示可见布局的最底端距离content最底端等于可见布局一半高度的时候调用该回调
                onEndReachedThreshold={0.1}
                // 是一个可选的优化，用于避免动态测量内容，+1是加上分割线的高度
                getItemLayout={(data, index) => ({ length: 40, offset: (40 + 1) * index, index })}
            />
        );
    }

    //渲染动态换行视图 
    _renderRightList() {
        const rightArr = [
            { key: '1', value: '长安逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机4449版' },
            { key: '2', value: '长安逸动EV飞机4449版长安逸动EV飞机' },
            { key: '3', value: '长安逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机' },
            { key: '4', value: '长安逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV' },
            { key: '5', value: '长安逸动EV飞机4449版长安逸' },
            { key: '6', value: '长安逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机4449版长安逸动EV飞机' }
        ]
        return (
            <FlatList
                data={rightArr}
                renderItem={this._renderRightItem}
                ItemSeparatorComponent={this._renderItemSeparatorComponent}
                ListFooterComponent={this._renderItemSeparatorComponent}
            />
        );
    }

    _renderRightItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 20, justifyContent: 'center' }}>
                    <Image style={{ width: 150, height: 100, backgroundColor: 'green' }}
                        source={{ uri: 'http://hsjry.oss-cn-hangzhou.aliyuncs.com/car/s50ev%EF%BC%8D%E5%8F%B3%E4%BE%A7135%E5%BA%A6-%E5%9B%9B%E8%89%B2%E5%88%86%E5%B1%82.png' }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'space-between', paddingLeft: 10, paddingTop: 20, paddingRight: 10, paddingBottom: 20 }}>
                    <Text style={{ fontSize: 16 }}>{item.value}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 20, backgroundColor: 'green' }}>
                        <Text style={{ fontSize: 16 }}>指导价：</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red' }}>10000000</Text>
                    </View>
                </View>

            </View>
        )
    }

    // 自定义分割线
    _renderItemSeparatorComponent = () => {
        return <View style={{ height: 1, backgroundColor: '#999999' }} />;
    };

    // Header
    _renderHeader = () => {
        return (
            <Text style={{ height: 50, backgroundColor: 'green' }}>我是头部</Text>
        );
    };

    // Footer
    _renderFooter = () => {
        if (this.state.showFoot === 1) {
            return (
                <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
                    <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if (this.state.showFoot === 0) {
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    };

    // 空布局
    _renderEmptyView = () => (
        <View><Text>EmptyView</Text></View>
    );

    _fetchData() {
        setTimeout(() => {

            var dataList = [];

            // 初始化数据
            for (let i = 0; i < 20; i++) {
                let obj = {
                    id: i,
                    title: this.state.page + '页第' + i + '条数据'
                };

                dataList.push(obj);
            }

            let foot = 0;
            if (this.state.page >= totalPage) {
                foot = 1;//listView底部显示没有更多数据了
            }

            var newList = [];
            if (this.state.page == 1) {
                newList = dataList;
            } else {
                newList = this.state.dataArray.concat(dataList)
            }

            this.setState({
                dataArray: newList,
                isLoading: false,
                showFoot: foot,
                isRefreshing: false,
            });
        }, 1000);
    }

    // 下拉刷新
    _renderRefresh = () => {
        this.setState({
            page: 1,
            isRefreshing: true,//tag,下拉刷新中，加载完全，就设置成flase
        });
        this._fetchData();
    };

    // 上拉加载更多
    _onEndReached = () => {

        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if ((this.state.page != 1) && (this.state.page >= totalPage)) {
            return;
        } else {
            this.state.page++;
        }
        //底部显示正在加载更多数据
        this.setState({ showFoot: 2 });
        //获取数据，在componentDidMount()已经请求过数据了

        if (this.state.page > 1) {
            this._fetchData();
        }
    }

    /**
     * 渲染行视图
     * 
     * @memberof FlatListTest
     */
    _renderItemView = ({ item }) => {

        let index = item.title;

        return (
            <FlatListItem
                id={index}
                title={item.title}
                onPressItem={this._onPressItem}
                selected={!!this.state.selected.get(index)}
            />
        );
    };

    /**
     * 使用箭头函数防止不必要的re-render；
     * 如果使用bind方式来绑定onPressItem，每次都会生成一个新的函数，导致props在===比较时返回false，
     * 从而触发自身的一次不必要的重新render，也就是FlatListItem组件每次都会重新渲染。
     * 
     * @param id
     * @private
     */
    _onPressItem = (id) => {
        this.setState((state) => {
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id));
            return { selected }
        });
    };
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        fontSize: 15,
        color: '#ffa700',
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    content: {
        marginBottom: 8,
        marginLeft: 8,
        marginRight: 8,
        fontSize: 14,
        color: 'black',
    }
});