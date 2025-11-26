/**
 * @format
 */

import 'react-native-gesture-handler';
// Initialize Firebase App early
import '@react-native-firebase/app';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
