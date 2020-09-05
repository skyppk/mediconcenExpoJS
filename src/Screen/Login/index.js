import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import logo from '../../Img/mediconcenLogo.png';

import InputField from "../../Component/InputField";
import PasswordField from "../../Component/PasswordField";
import Service from "../../Services";
import AsyncStorage from "@react-native-community/async-storage";

import setAuthorization from "../../Services/author";

const {width: WIDTH} = Dimensions.get('window')

class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            hiddenPW: true,
            isShow: false,
            emailText: '',
            passwordText: '',
        }
    }

    showPW = () => {
        if (this.state.isShow == false){
            this.setState({hiddenPW: false, isShow: true})
        } else {
            this.setState({hiddenPW: true, isShow: false})
        }
    }

    setEmailText = (text) => {
        this.setState({emailText: text})
        console.log(this.state.emailText)
    }

    setPasswordText = (text) => {
        this.setState({passwordText: text})
        console.log(this.state.passwordText)
    }

    loginCallback = () =>  Service.login(this.state, response => {
        const token = response.data.access_token;
        const info = response.data.info;
        console.log(info.clinic)
        AsyncStorage.setItem('clinic', info.clinic);
        setAuthorization(token)
        this.props.navigation.navigate('Home')
        }
    )



    render() {
        return(
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <Image source={logo} style={styles.logo} />
                            <Text style={styles.logoText} >Mediconcen</Text>
                        </View>

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



                        <TouchableOpacity
                            style={styles.btnLogin}
                            // onPress={() => Service.test(a => console.log(a.data))}
                            onPress={ this.loginCallback }
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnRegister}
                            onPress={() => this.props.navigation.navigate('Register')}
                        >
                            <Text style={styles.registerText}>Register if you don't have an account</Text>
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
        justifyContent: 'center',
    },
    logoContainer:{
        alignItems: 'center',
        marginBottom: 50
    },
    logo:{
        width: 120,
        height: 120
    },
    logoText: {
        color: '#6d2626',
        fontSize: 25,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.8
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
        color: 'rgba(255, 255, 255, 0.9)',
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
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#6769ef',
        justifyContent: 'center',
        marginTop: 20
    },
    loginText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
    btnRegister:{
        width: WIDTH - 55,
        justifyContent: 'center',
        marginTop: 10
    },
    registerText: {
        color: 'blue',
        fontSize: 14,
        textAlign:'center'
    }
});


export default LoginScreen