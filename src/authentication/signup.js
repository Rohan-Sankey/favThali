
import { Alert } from 'react-native';
import {getAuth , createUserWithEmailAndPassword} from '@react-native-firebase/auth';



export const onSignUp = (email , password) => {

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