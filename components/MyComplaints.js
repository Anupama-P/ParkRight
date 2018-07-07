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

import { Icon } from 'react-native-elements';

import { createStackNavigator } from 'react-navigation';

import DeviceInfo from 'react-native-device-info';

export default class MyComplaints extends Component {
  constructor(props) {
      super(props);
      this.state = {
        text: '',
        dataArray: [],
      }
  };

  componentWillMount() {
    const url = DeviceInfo.getUniqueId();
    return fetch(`http://parkright.herokuapp.com/complaint/?device_id=${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response)
      if (JSON.parse(response._bodyText)) {
        this.setState({ dataArray: JSON.parse(response._bodyText).data });
      }
    }).catch(err => {
      this.setState({dataArray: []})
      console.log(err)
    });
  }

  render() {
    return (
      <View style={{
        marginTop: 70,
        marginLeft: 20,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        width: '90%',
        height: '100%'
      }}>
        <Text style={{ fontSize: 40, marginTop: 20 }}>My Complaints</Text>
        {this.state.dataArray && this.state.dataArray.map((item) => {
          return (
            <View style={{ flexDirection:'row', flexWrap: 'wrap', marginTop: 20 }}>
              <Text style={{ width: '30%', fontSize: 20 }}>{item.complained_date}</Text>
              <Text style={{ width: '70%', fontSize: 20 }}>{item.complaint_type}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

AppRegistry.registerComponent('MyComplaints', () => MyComplaints);
