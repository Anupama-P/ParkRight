import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import App from './App';

// import SimilarFaces from './components/SimilarFaces';
import RegisterScreen from './components/RegisterScreen';

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
    this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return (
      <View style={styles.container}>
        <RegisterScreen />
      </View>
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

AppRegistry.registerComponent('ParkRight', () => IndexScreen);