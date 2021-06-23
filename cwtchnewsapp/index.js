import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import RootApp from './src/RootApp'

import PushNotification from 'react-native-push-notification';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

PushNotification.configure({
    onNotification: (notification) => {
        if (notification) {
            console.log(notification);
            Alert.alert('Opened push notification', JSON.stringify(notification));
        }
    },
});
GoogleSignin.configure({
    webClientId: '350416576934-3qnqa9niinbaikun27jg1vid04kj21c1.apps.googleusercontent.com',
});
AppRegistry.registerComponent(appName, () => RootApp);