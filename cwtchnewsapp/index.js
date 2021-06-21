import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import RootApp from './src/RootApp'

AppRegistry.registerComponent(appName, () => RootApp);