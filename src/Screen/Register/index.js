import React from 'react';
import {
    StyleSheet,
    Text,
    View,
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

    checkBeforeLogin = () => {
        let emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phonereg = /^[0-9]{8}$/;
        if (emailreg.test(this.state.emailText) == false ){
            Alert.alert(
                "Validation",
                "Wrong email format !",
                [
                    {
                        text: "OK",
                        onPress: () => {}
                    }
                ]
            )
            return false
        }else if (this.state.passwordText == ""){
            Alert.alert(
                "Validation",
                "Password and Repeated password cannot empty !",
                [
                    {
                        text: "OK",
                        onPress: () => {}
                    }
                ]
            )
            return false
        }else if (this.state.passwordText !== this.state.repasswordText){
            Alert.alert(
                "Validation",
                "Password and Repeated password not same !",
                [
                    {
                        text: "OK",
                        onPress: () => {}
                    }
                ]
            )
            return false
        }else if (phonereg.test(this.state.phoneText) == false){
            Alert.alert(
                "Validation",
                "Phone number should be 8 digit !",
                [
                    {
                        text: "OK",
                        onPress: () => {}
                    }
                ]
            )
            return false
        }

        return true


    }

    validate(text, type){
        let emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       if (type == "email"){
            if (emailreg.test(text) == false){
                return false
            }
       }else if (type == "password"){
           if (!this.state.passwordText == this.state.repasswordText){
               return false
           }
       }
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
        if (this.checkBeforeLogin()){
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


    }

    render() {
        return(
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form}>

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
        // padding: 20,
        justifyContent: 'flex-start',
    },
    form:{
        // flexDirection: "column",
        padding: 20
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 25
    },
    registerText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
});


export default RegisterScreen