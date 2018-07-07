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

import OtpInputs from 'react-native-otp-inputs'
import DeviceInfo from 'react-native-device-info';

export default class OTPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp_code: null,
            isSubmitting: false,
            hideOTPmessage: false,
            errorMessage: null
        }
    };

    verifyOTP = (code)=>{
        if (code != null && code.length == 6){
            this.setState({isSubmitting: true})
            this.setState({hideOTPmessage: true})

            console.log(code)

            return fetch('http://parkright.herokuapp.com/user/verify/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    device_id: DeviceInfo.getUniqueID(),
                    otp: code,
                }),
            }).then(response => {
                this.setState({isSubmitting: false})
                console.log(response)

                if (response.status == '401') {
                    this.setState({errorMessage: 'Invalid OTP'})
                } else if (response.status == '200' && JSON.parse(response._bodyText).registration) {
                    this.props.navigation.navigate('LoggedInScreens');
                } else if (response.status == '200') {
                    this.props.navigation.navigate('LoggedInScreens');
                } else {
                    this.setState({
                        errorMessage: 'Invalid Response: Status Code' + response.status
                    })
                }
            }).catch(err => {
                this.setState({isSubmitting: false})
                console.log(err)
            });
        }
    }

    render() {
        return(
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    marginTop: 40,
                    fontSize: 40,
                    fontWeight: 'bold'
                }}>Enter OTP</Text>

                {this.state.hideOTPmessage == false ?
                    (<Text style={{ marginTop: 20 }}>Please check your email for OTP</Text>)
                    :
                    null
                }

                {this.state.isSubmitting && (
                    <ActivityIndicator hide={true} size="large" color="#0000ff" />
                )}

                <OtpInputs
                    handleChange={code => this.verifyOTP(code)}
                    numberOfInputs={6}
                    errorMessageTextStyles={styles.errormessagetextstyles}
                    inputTextErrorColor='#ff0000'
                    errorMessage={this.state.errorMessage != null ? this.state.errorMessage : null}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    errormessagetextstyles: {
        marginTop: 20,
        textAlign: 'center',
        color: '#ff0000',
        fontSize: 20
    }
});

AppRegistry.registerComponent('OTPScreen', () => OTPScreen);
