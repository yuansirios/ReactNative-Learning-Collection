
/**
 * 布局工具类
 */
import {
    StyleSheet,
} from 'react-native';

export default FlexBoxUtil = StyleSheet.create({
    /* debug边框显示 */
    debugRed: {
        borderColor: 'red',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    debugBlue: {
        borderColor: 'blue',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    debugGreen: {
        borderColor: 'green',
        borderWidth: 1,
        borderStyle: 'solid'
    },

    /* 横向布局 从左到右 */
    rowLayout: {
        flexDirection: 'row'
    },

    /* 纵向布局 从上到下 */
    columnLayout: {
        flexDirection: 'column'
    },

    /* 水平居中 */
    rowCenter: {
        justifyContent: 'center'
    },

    /* 水平靠右 */
    rowRight: {
        justifyContent: 'flex-end'
    },

    /* 垂直居中 */
    columnCenter: {
        alignItems: 'center'
    },

    /* 垂直底部 */
    columnBottom: {
        alignItems: 'flex-end'
    },

    /* 水平垂直居中 */
    row_column_center: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    /* 动态换行 */
    wrap: {
        flexWrap: 'wrap'
    }
});