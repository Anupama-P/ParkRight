import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Button,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import DeviceInfo from 'react-native-device-info';

import VehicleList from './VehicleList'
import SimilarFaces from './SimilarFaces'
import MyComplaints from './MyComplaints'

const BottomTabNavigator = createBottomTabNavigator({
  Complain: {
    // screen: (props) => <SimilarFaces DeviceUniqueID=DeviceInfo.getUniqueID() />  },
    screen: (props) => <SimilarFaces {...props} birdType="Resident" args={{ height: 100, region: 'America' }} />,
    },

  'My Complaints': { screen: MyComplaints },
  'Vehicle List': { screen: VehicleList },
}, {
    initialRouteName: 'Complain',
    initialRouteParams: { DeviceUniqueID: DeviceInfo.getUniqueID() },
    activeTintColor: '#f0edf6',
    inactiveTintColor: '#3e2465',
    barStyle: {
        backgroundColor: '#694fad',
    },
    tabBarOptions: {
        labelStyle: {
            marginTop: 20,
            fontSize: 14,
            lineHeight: 45,
        },
        activeTintColor: '#ffffff',
        activeBackgroundColor: '#2F619B'
    }
});

export default class LoggedInScreens extends Component {
    render() {
        return (
            <BottomTabNavigator />
            )
    }
}