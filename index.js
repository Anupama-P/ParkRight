import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import RegisterScreen from './components/RegisterScreen';
import OTPScreen from './components/OTPScreen';
import SimilarFaces from './components/SimilarFaces';

const StackNavigator = createStackNavigator({
    Home: {
        screen: RegisterScreen,
        navigationOptions: {
            header: null,
        }
    },
    OTPScreen: {
        screen: OTPScreen,
        navigationOptions: {
            title: 'OTP'
        }
    },
    SimilarFaces: {
        screen: SimilarFaces,
        navigationOptions: {
            header: null,
        }
    }
});

const image_picker_options = {
    title: 'Select Photo',
    takePhotoButtonTitle: 'Take Photo...',
    chooseFromLibraryButtonTitle: 'Choose from Library...',
    cameraType: 'back',
    mediaType: 'photo',
    maxWidth: 480,
    quality: 1,
    noData: false,
};

//the API Key that you got from Microsoft Azure
const api_key = 'd6975a797c91410db46f9be6606f551e'; //face
const api_computer_vision = '84d895648cb9402aba03de99143b9085' //image

class IndexScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StackNavigator style={styles.container} />
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    }
});

AppRegistry.registerComponent('StackNavigator', () => StackNavigator);
AppRegistry.registerComponent('ParkRight', () => IndexScreen);
