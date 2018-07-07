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

import { createStackNavigator } from 'react-navigation';

import DeviceInfo from 'react-native-device-info';

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            underlineColorAndroid: '#2F619B',
            isSubmitting: false,
            showRegisterButton: true
        }
    };

    // componentDidMount() {
    //     this.setState({
    //         showRegisterButton: true
    //     })
    // }

    callRegisterAPI() {
        this.setState({isSubmitting: true})
        Keyboard.dismiss()

        return fetch('http://parkright.herokuapp.com/user/verify/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                device_id: DeviceInfo.getUniqueID(),
                email: this.state.email,
            }),
        }).then(response => {
            this.setState({isSubmitting: false})
            this.setState({showRegisterButton: false})
            console.log(response)

            this.props.navigation.navigate('OTPScreen')
        }).catch(err => {
            this.setState({isSubmitting: false})
            this.setState({showRegisterButton: true})
            console.log(err)
        });
    }

    validateEmail(email) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

        if(reg.test(email) === false) {
            this.setState({underlineColorAndroid: '#ff0000'})
            this.setState({email: email})
            return false;
        }
        else {
            this.setState({email: email})
            this.setState({underlineColorAndroid: '#2F619B'})
        }
    }

    render() {
        return(
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
            }}>

            <KeyboardAvoidingView behavior="padding" enabled>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        marginTop: 150,
                        marginBottom: 150,
                        borderRadius: 4,
                        borderWidth: 0.5,
                        borderColor: '#d6d7da',
                        left: '25%',
                    }}
                    source={require('./assets/images/logo.png')}
                />

                <TextInput
                    onChangeText={( email ) => this.validateEmail(email)}
                    style={{
                      width: 300,
                      height: 60,
                      fontSize: 25
                    }}
                    underlineColorAndroid={this.state.underlineColorAndroid}
                    value={this.state.email}
                />

                {!this.state.isSubmitting && this.state.showRegisterButton ?
                    <Button
                        theme='light'
                        onPress={this.callRegisterAPI.bind(this)}
                        // onPress={() => this.props.navigation.navigate('OTP')}
                        title="Register"
                        color="#2F619B"
                        value="NORMAL FLAT"
                        buttonStyle={{width:"100%"}}
                    />
                    :
                    null
                }

                {this.state.isSubmitting && (
                    <ActivityIndicator hide={true} size="large" color="#0000ff" />
                )}
            </KeyboardAvoidingView>
            </View>
        )
    }
}

AppRegistry.registerComponent('RegisterScreen', () => RegisterScreen);
