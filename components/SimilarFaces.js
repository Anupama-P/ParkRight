import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  Picker
} from 'react-native';
import DeviceInfo from 'react-native-device-info';


import NativeModules, { ImagePickerManager } from 'NativeModules';
import Button from './Button';

import RNFetchBlob from 'react-native-fetch-blob';
var ImagePicker = require('react-native-image-picker');

import _ from 'lodash';

export default class SimilarFaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo_style: {
        position: 'relative',
        width: 480,
        height: 480
      },
      has_photo: false,
      photo: null,
      numbers: null
    };
  }


  render() {

    return (
      <View style={styles.container}>

        <ImageBackground
          style={this.state.photo_style}
          source={this.state.photo}
          resizeMode={"contain"}
        >
        </ImageBackground>

        <Button
          text="My Complaints"
          onPress={() => this.props.navigation.navigate('MyComplaints')}
          button_styles={styles.button}
          button_text_styles={styles.button_text} />

        <Button
          text="Vehicle List"
          onPress={() => this.props.navigation.navigate('VehicleList')}
          button_styles={styles.button}
          button_text_styles={styles.button_text} />

        <Button
          text="Pick Photo"
          onpress={this._pickImage.bind(this)}
          button_styles={styles.button}
          button_text_styles={styles.button_text} />

        <Picker
          selectedValue={this.state.complaint}
          style={{ height: 50, width: 400 }}
          onValueChange={(itemValue, itemIndex) => this.setState({complaint: itemValue})}>
          <Picker.Item label="Select Reason" value="" />
          <Picker.Item label="Vehicle has no sticker" value="NO_STICKER" />
          <Picker.Item label="Vehicle not parked in a proper place." value="NO_STICKER" />
          <Picker.Item label="Vehicle not parked properly." value="WRONG_PARKING" />
        </Picker>


        {this._renderDetectFacesButton.call(this)}

      </View>
    );
  }

  _pickImage() {

    this.setState({
      numbers: null
    });

    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          photo_style: {
            position: 'relative',
            width: response.width,
            height: response.height
          },
          has_photo: true,
          photo: source,
          photo_data: response.data
        });
      }
    });

  }

  _renderDetectFacesButton() {
    if (this.state.has_photo) {
      return (
        <Button
          text="Detect Faces"
          title="Detect Faces"
          onpress={this._detectFaces.bind(this)}
          button_styles={styles.button}
          button_text_styles={styles.button_text} />
      );
    }
  }

  _detectFaces() {
    //face: https://centralindia.api.cognitive.microsoft.com/face/v1.0
    //image:https://centralindia.api.cognitive.microsoft.com/vision/v1.0
    RNFetchBlob.fetch('POST', 'https://centralindia.api.cognitive.microsoft.com/vision/v1.0/ocr?language=en&detectOrientation=true', {
      'Accept': 'application/json',
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': this.props.apiKey
    }, this.state.photo_data)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.regions.length) {
          let final = '';
          const lines = json.regions[0].lines;
          lines.map((item) => {
            item.words.map((word) => {
              final = final.concat(word.text)
            });
          });
          alert(final);
          console.log(DeviceInfo);
          this.setState({
            numbers: final
          });
          return fetch('http://parkright.herokuapp.com/complaint/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              complainant: "harsha.ashok@galepartners.com",
              complaint_type: "WRONG_PARKING",
              device_id: DeviceInfo.getUniqueID(),
              vehicle_number: final,
              vehicle_type: "BIKE",
            }),
          });
        } else {
          alert("Sorry, I can't see any numbers in there.");
        }

        return json;
      })
      .catch(function (error) {
        console.log(error);
        alert('Sorry, the request failed. Please try again.' + JSON.stringify(error));
      });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ccc'
  },
  button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#529ecc'
  },
  button_text: {
    color: '#FFF',
    fontSize: 20
  }
});


AppRegistry.registerComponent('SimilarFaces', () => SimilarFaces);