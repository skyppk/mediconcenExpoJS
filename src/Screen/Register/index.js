import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import InputField from "../../Component/InputField";
import PasswordField from "../../Component/PasswordField";
import Service from "../../Services";

const {width: WIDTH} = Dimensions.get('window')

class RegisterScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailText: '',
            passwordText: '',
            repasswordText: '',
            clinicText: '',
            phoneText: '',
            addressText: '',
            hiddenPW: true,
            isShow: false,
            hiddenRePW: true,
            isReShow: false
        };

    }

    setEmailText = (text) => {
        this.setState({emailText: text});
    }

    setPasswordText = (text) => {
        this.setState({passwordText: text});
    }

    setRepasswordText = (text) => {
        this.setState({repasswordText: text});
    }

    setClinicText = (text) => {
        this.setState({clinicText: text});
    }

    setPhoneText = (text) => {
        this.setState({phoneText: text});
    }

    setAddressText = (text) => {
        this.setState({addressText: text});
    }

    showPW = () => {
        if (this.state.isShow == false){
            this.setState({hiddenPW: false, isShow: true})
        } else {
            this.setState({hiddenPW: true, isShow: false})
        }
    }

    showRePW = () => {
        if (this.state.isReShow == false){
            this.setState({hiddenRePW: false, isReShow: true})
        } else {
            this.setState({hiddenRePW: true, isReShow: false})
        }
    }

    registerAccount = () => {
        Service.register(this.state, response => {
                Alert.alert(
                    "Register",
                    response.data.message,
                    [
                        {
                            text: "OK",
                            onPress: () => this.props.navigation.navigate('Login')
                        }
                    ]
                )

        })

    }

    render() {
        return(
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>

                        <InputField
                            icon={'envelope'}
                            placeHolder={'Email'}
                            changeText={this.setEmailText}
                        />

                        <PasswordField
                            icon={'lock'}
                            placeHolder={'Password'}
                            secureEntry={this.state.hiddenPW}
                            isShow={this.state.isShow}
                            showPW={this.showPW}
                            changeText={this.setPasswordText}
                        />

                        <PasswordField
                            icon={'lock'}
                            placeHolder={'Re Enter Password'}
                            secureEntry={this.state.hiddenRePW}
                            isShow={this.state.isReShow}
                            showPW={this.showRePW}
                            changeText={this.setRepasswordText}
                        />

                        <InputField
                            icon={'clinic-medical'}
                            placeHolder={'Clinic Name'}
                            changeText={this.setClinicText}
                        />

                        <InputField
                            icon={'phone'}
                            placeHolder={'Phone'}
                            changeText={this.setPhoneText}
                        />

                        <InputField
                            icon={'map-marked'}
                            placeHolder={'Address'}
                            changeText={this.setAddressText}
                        />




                        <TouchableOpacity
                            style={styles.btnRegister}
                            onPress={this.registerAccount}
                        >
                            <Text style={styles.registerText}>Register</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20
        // justifyContent: 'center',
    },
    inputContainer:{
        marginTop: 10
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 9,
        left: 37,
    },
    btnEye: {
        position: 'absolute',
        top: 9,
        right: 37
    },
    btnRegister: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#6769ef',
        justifyContent: 'center',
        marginTop: 20
    },
    registerText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
});


export default RegisterScreen