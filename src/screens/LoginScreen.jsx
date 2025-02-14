import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({navigation}) => {

  // const isAdmin = false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    if(email ==='user@gmail.com' && password === '123'){
        navigation.navigate('Home' , {isAdmin : false})
    } else if(email === 'admin@gmail.com' && password === '123'){
        navigation.navigate('Home' , {isAdmin : true})
    } else {
      navigation.navigate('Home' , {isAdmin : false})
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
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
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
    width: "90%",
    height: 50,
    backgroundColor: "#2c2c2c",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#f5cb5c",
    paddingVertical: 12,
    width: "90%",
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: "#1e1e1e",
    fontSize: 18,
    fontWeight: "bold",
  },
});
