import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CartScreen from './CartScreen';
import {useNavigation, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native'

const PaymentResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {result} = route.params || {};

  const getResultDetails = () => {
    switch (result) {
      case 'success':
        return {
          message: 'Payment Successful !',
          animation: require('../assets/animations/success.json'),
        
        };

      case 'failed':
        return {
          message: 'Order Cancelled !',
          animation: require('../assets/animations/failed.json'),
         
        };

      default:
        return {
          message: 'payment processing ',
          animation: require('../assets/animations/processing.json'),
         
        };
    }
  };

  const {message, animation} = getResultDetails();

  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      <LottieView 
      
      source={animation}
      autoPlay
      loop  //loop 
      style = {styles.animation}
      
      />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity
        onPress={()=>navigation.navigate('Home')}
        style={styles.button}>
            <Text style = {styles.buttontext}>Go to Home</Text>
        </TouchableOpacity>
    </View>
  );
};

export default PaymentResultScreen;

const styles = StyleSheet.create({
    container:{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    animation: {
        width: 150,
        height: 150,
        marginBottom: 20,
      },
    message : {
        fontSize : 20,
        fontWeight : 'bold',
        color : 'black',
        marginBottom :20
    },
    button:{
        backgroundColor: '#333',
        paddingVertical : 10,
        paddingHorizontal : 20,
        borderRadius : 8
    },
    buttontext:{
        color : 'white',
        fontWeight : 'bold'
    }
});
