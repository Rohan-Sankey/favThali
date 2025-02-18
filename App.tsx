import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { uploadDish } from "./src/redux/cartSlice";
import UploadDish from "./src/screens/uploadDish";
import PaymentMethods from "./src/screens/PaymentMethods";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style = {{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name = "LoginScreen" component={LoginScreen} options={{headerShown : false}}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name = "uploadDish" component={UploadDish}/>
          <Stack.Screen name="PaymentMethods" component={PaymentMethods}/>
        </Stack.Navigator>
      </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
