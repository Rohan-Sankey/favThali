import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '130908236795-5bdhkcif75t36upsr5hlcsbsn8153vls.apps.googleusercontent.com'
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleLogin = async () => {
    try {
      console.log('Attempting login with:', email, password);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user.email);

      const isAdmin = email === 'admin@gmail.com' && password === '123456';
      console.log('Is Admin:', isAdmin);

      navigation.navigate('Home', { isAdmin });
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Login Failed', 'User does not exist');
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      console.log('Function called for Google login');

      // Check if Google Play Services is available
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Get the user's ID token
      const signInResult = await GoogleSignin.signIn();
      console.log('Google Sign-In Result:', signInResult);

      const idToken = signInResult.data.idToken;

      // Extract the ID token
      // const { idToken } = signInResult;
      console.log('Google Sign-In ID Token:', idToken);

      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);
      console.log('Google Credential:', googleCredential);

      // Sign in with the credential
      const userCredential = await signInWithCredential(auth, googleCredential);
      console.log('User signed in with Google:', userCredential.user);

      // Navigate to the Home screen
      navigation.navigate('Home', { isAdmin: false });
    } catch (error) {
      console.error('Google Sign-In error:', error.message);
      Alert.alert('Google Sign-In Failed', error.message);
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.footerLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      <Button
        title="Google Sign-In"
        onPress={onGoogleButtonPress}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
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
});