import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleLogin = async () => {
    try {
      console.log('Attempting login with:', email, password);

      const userCredential = await signInWithEmailAndPassword(auth ,email, password);
      const user = userCredential.user;
      console.log('User logged in:', user.email);

      const isAdmin = email === 'admin@gmail.com' && password === '123456';
      console.log('Is Admin:', isAdmin);

      navigation.navigate('Home', {isAdmin});
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Login Failed user does not exist');
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
