/**
 * @format
 */
import React, { Component } from 'react'
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';

import { Provider } from 'react-redux'
import store from './app/Store/index'

import InitApp from './app/InitApp';

class Apps extends Component {
    render() {
        return (
            // 挂载store,让app内部所有组件都可以使用
            <Provider store={store}>
                <InitApp />
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => Apps);
