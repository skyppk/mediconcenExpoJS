import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Dimensions, TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width: WIDTH} = Dimensions.get('window')

const PasswordField = ({icon, placeHolder, secureEntry, isShow, showPW, changeText}) => {
    return (
        <View style={styles.inputContainer}>
            <Icon
                name={icon}
                size={22}
                // color={'rgba(255, 255, 255, 0.7)'}
                style={styles.inputIcon}
            />
            <TextInput
                style={styles.input}
                placeholder={placeHolder}
                secureTextEntry={secureEntry}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                // textContentType={'password'}
                onChangeText={text => changeText(text)}
                // keyboardType={'password'}
                underlineColorAndroid={'transparent'}
            />

            <TouchableOpacity
                style={styles.btnEye}
                onPress={showPW}
            >
                <Icon
                    name={isShow == false ? 'eye' : 'eye-slash'}
                    size={26}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
});


export default PasswordField