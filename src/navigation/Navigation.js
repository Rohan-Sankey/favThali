import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import UploadDish from "../screens/uploadDish";
import PaymentMethods from "../screens/PaymentMethods";
import PaymentResultScreen from "../screens/PaymentResultScreen";
import SignUpScreen from "../screens/SignUpScreen";


const Stack = createNativeStackNavigator();

const Navigation = ()=>{

    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUpScreen">
        <Stack.Screen name = "SignUpScreen" component={SignUpScreen} options={{headerShown : false}}/>
          <Stack.Screen name = "LoginScreen" component={LoginScreen} options={{headerShown : false}}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name = "uploadDish" component={UploadDish}/>
          <Stack.Screen name="PaymentMethods" component={PaymentMethods}/>
          <Stack.Screen name = "PaymentResultScreen" component={PaymentResultScreen} options={{headerShown : false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )

}

export default Navigation;