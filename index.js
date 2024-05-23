/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './App';
import { GetAllCarsScreen } from "./src/infrastructure/ui/screens/get-all-cars.screen";
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => GetAllCarsScreen);
