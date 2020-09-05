import { createAppContainer } from "react-navigation";
import {createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screen/Login";
import RegisterScreen from "./Screen/Register";
import HomeScreen from "./Screen/Home";
import DetailsScreen from "./Screen/Details";

const BeforeSignin = createStackNavigator({
    Login: {
        screen: LoginScreen
    }
}, {
    headerMode: "none",
    initialRouteName: "Login"
})