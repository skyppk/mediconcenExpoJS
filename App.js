import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStore} from "redux";
import { Provider } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import mainReducer from './src/Reducers';
import LoginScreen from './src/Screen/Login';
import RegisterScreen from "./src/Screen/Register";
import HomeScreen from "./src/Screen/Home";
import DetailsScreen from "./src/Screen/Details";

const store = createStore(mainReducer);
const Stack = createStackNavigator();

export default function App() {

  return (
      <Provider store={store}>
          <NavigationContainer>
              <Stack.Navigator initalRouteName={"Home"}>
                  <Stack.Screen options={{headerShown: false}} name={"Home"} component={HomeScreen} />
                  {/*<Stack.Screen options={{headerShown: false}} name={"Login"} component={LoginScreen} />*/}
                  <Stack.Screen name={"Register"} component={RegisterScreen} />
                  <Stack.Screen name={"Details"} component={DetailsScreen} />
              </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
      </Provider>
  );
}
