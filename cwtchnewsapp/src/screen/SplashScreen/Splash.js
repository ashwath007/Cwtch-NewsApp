import React from 'react';
import { StyleSheet,View,Text,Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Splash = () => {

        return(
            <View style={{height:windowHeight,width:windowWidth}}>
                <LottieView source={require('./loading.json')} autoPlay loop />
            </View>
            )
}

export default Splash;