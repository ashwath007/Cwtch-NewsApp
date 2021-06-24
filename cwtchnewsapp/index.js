import { AppRegistry, useEffect } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import RootApp from './src/RootApp'

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import PushNotification from 'react-native-push-notification';

import { Importance } from 'react-native-push-notification';








GoogleSignin.configure({
    webClientId: '350416576934-3qnqa9niinbaikun27jg1vid04kj21c1.apps.googleusercontent.com',
});
AppRegistry.registerComponent(appName, () => RootApp);