import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {handleLogin , onGoogleButtonPress} from '../authentication/login'


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

<TouchableOpacity style={styles.loginButton} onPress={() => handleLogin(email, password, navigation)}>
  <Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.footerLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      {/* Google Sign-In Button */}
      <TouchableOpacity style={styles.googleButton} onPress={()=>onGoogleButtonPress(navigation)}>
        <Image
          source={require('../assets/icons/google.png')} // Add your Google logo here
          style={styles.googleLogo}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  mainText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#2c2c2c',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#f5cb5c',
    paddingVertical: 12,
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1e1e1e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    marginTop: 20,
    color: 'white',
  },
  footerLink: {
    color: '#f5cb5c',
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
});
