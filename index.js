/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import InitApp from './app/InitApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => InitApp);
