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

export default class VehicleList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        text: '',
        DisplayVehicleList: [],
      }
  };

  componentDidMount() {
      return fetch('http://parkright.herokuapp.com/vehicle/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_id: DeviceInfo.getUniqueId(),
        })
      }).then(response => {
        if (JSON.parse(response._bodyText)) {
          this.setState({ DisplayVehicleList: JSON.parse(response._bodyText).vehicle_list });
        }
      }).catch(err => {
        this.setState({DisplayVehicleList: []})
        console.log(err)
      });
  }

  _callRegisterAPI() {
      Keyboard.dismiss()

      return fetch('http://parkright.herokuapp.com/vehicle/', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              device_id: DeviceInfo.getUniqueId(),
              vehicle_number: this.state.text,
          }),
      }).then(response => {
        console.log(response)
        if (JSON.parse(response._bodyText)) {
          console.log(JSON.parse(response._bodyText))
          this.setState({ DisplayVehicleList: JSON.parse(response._bodyText).vehicle_list, text: '' });
        }
      }).catch(err => {
        this.setState({DisplayVehicleList: []})
        console.log(err)
      });
  }

  updateText(text) {
    this.setState({text});
  }

  deleteCall(text) {
    return fetch('http://parkright.herokuapp.com/vehicle/', {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            device_id: DeviceInfo.getUniqueId(),
            vehicle_number: text,
        }),
      }).then(response => {
        if (JSON.parse(response._bodyText)) {
          this.setState({ DisplayVehicleList: JSON.parse(response._bodyText).vehicle_list, text: '' });
        }
      }).catch(err => {
        this.setState({DisplayVehicleList: []})
        console.log(err)
      });
  }

  render() {
    console.log(this.state.DisplayVehicleList);
    return (
      <View style={{
        marginTop: 70,
        marginLeft: 20,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        width: '90%'
      }}>

        <KeyboardAvoidingView behavior="padding" enabled>
          <Text style={{fontSize: 40}}>Your Registered Vehicle Numbers:</Text>
          <View>
            {this.state.DisplayVehicleList.map((item) => {
              return (
                <View style={{marginTop: 20, flexDirection:'row'}}>
                  <Text style={{fontSize: 30}}>{item.vehicle_number}</Text>
                  <Icon
                    name='delete'
                    size={30}
                    style={{ marginLeft: 20 }}
                    color='#00aced'
                    type="MaterialCommunityIcons"
                    onPress={this.deleteCall.bind(this, item.vehicle_number)}
                  />
                </View>
              );
            })}
          </View>
          {
            !this.state.DisplayVehicleList.length ? <Text style={{ fontSize: 30, marginTop: 20 }}>No Registered Vehicles</Text> : null
          }

          <TextInput
            onChangeText={( text ) => this.updateText(text)}
            style={{
              height: 60,
              width: 300,
              marginTop: 50,
              fontSize: 25
            }}
            value={this.state.text}
            placeholder={'Add New Vehicle Number'}
          />

          <Button
            theme='light'
            onPress={this._callRegisterAPI.bind(this)}
            title="Add Vehicle"
            color="#2F619B"
            value="NORMAL FLAT"
            buttonStyle={{width:"100%", fontSize: 20}}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

AppRegistry.registerComponent('VehicleList', () => VehicleList);
