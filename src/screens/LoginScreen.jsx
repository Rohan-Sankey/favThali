import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { authorize } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleLogin, onGoogleButtonPress } from '../authentication/login';

// ✅ GitHub OAuth Configuration
const githubConfig = {
  clientId: 'Ov23lixmo8prD3KqNOMF',
  clientSecret: '86aa3a5568d4283c1acb91f3ec801668077b0c86', // Only needed for server-side exchange, not on mobile
  redirectUrl: 'https://favthali.firebaseapp.com/__/auth/handler', // Update this with your app's redirect URL
  scopes: ['user', 'repo'], // Define the required scopes
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
  },
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //  GitHub Login Function
  const onGithubButtonPress = async () => {
    try {
      const authResult = await authorize(githubConfig);
      console.log('GitHub Login Success:', authResult);

      // Store GitHub access token securely
      await AsyncStorage.setItem('github_token', authResult.accessToken);

      Alert.alert('Login Successful!', 'You are now logged in with GitHub.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('GitHub Login Error:', error);
      Alert.alert('GitHub Login Failed', error.message);
    }
  };

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

     
      <TouchableOpacity style={styles.googleButton} onPress={() => onGoogleButtonPress(navigation)}>
        <Image source={require('../assets/icons/google.png')} style={styles.googleLogo} />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.githubButton} onPress={onGithubButtonPress}>
        <Image source={require('../assets/icons/github.png')} style={styles.githubLogo} />
        <Text style={styles.githubButtonText}>Sign in with GitHub</Text>
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
  githubButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  githubLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  githubButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
