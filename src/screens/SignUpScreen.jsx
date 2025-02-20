import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import {getAuth , createUserWithEmailAndPassword} from '@react-native-firebase/auth';

const SignUpScreen = ({}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {

    const authentication = getAuth();

    createUserWithEmailAndPassword(authentication , email ,password)
    .then(()=>{
        if (email === 'admin@gmail.com' && password === '123456') {
            navigation.navigate('Home' , {isAdmin : true})
        } else{
            navigation.navigate('Home' , {isAdmin : false})
        }

        console.log('Account created');
        Alert.alert('Account created !')

    })

    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Account exist , login !')
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
    
       // console.error(error);
      });
  };

  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ddd"
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ddd"
        value={password}
        onChangeText={value => {
          setPassword(value);
        }}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={() => { onSignUp();}}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.footerLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    fontSize: 16,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5cb5c',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
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

export default SignUpScreen;
