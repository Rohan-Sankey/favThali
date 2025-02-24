import {StyleSheet, Text, View, TouchableOpacity, Animated, useAnimatedValue} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const PaymentResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {result} = route.params || {};

  
  // const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity starts at 0
  const fadeAnim = useAnimatedValue(0);
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Starts slightly smaller

  useEffect(() => { 
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 3000,
        useNativeDriver: true,
      }).start();

  }, []);

  const getResultDetails = () => {
    switch (result) {
      case 'success':
        return {
          message: 'Payment Successful!',
          animation: require('../assets/animations/success.json'),
        };

      case 'failed':
        return {
          message: 'Order Cancelled!',
          animation: require('../assets/animations/failed.json'),
        };

      default:
        return {
          message: 'Payment Processing...',
          animation: require('../assets/animations/processing.json'),
        };
    }
  };

  const {message, animation} = getResultDetails();

  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      <LottieView source={animation} autoPlay loop={false} style={styles.animation} />

      
      <Animated.Text style={[styles.message, {opacity: fadeAnim, transform: [{scale: scaleAnim}]}]}>
        {message}  
      </Animated.Text>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
        <Text style={styles.buttontext}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttontext: {
    color: 'white',
    fontWeight: 'bold',
  },
});
