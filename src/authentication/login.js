import {Alert} from 'react-native';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '130908236795-5bdhkcif75t36upsr5hlcsbsn8153vls.apps.googleusercontent.com'
  });

const auth = getAuth();

export const handleLogin = async (email , password , navigation) => {
  try {
    console.log('Attempting login with:', email, password);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    console.log('User logged in:', user.email);

    const isAdmin = email === 'admin@gmail.com' && password === '123456';
    console.log('Is Admin:', isAdmin);

    navigation.navigate('Home', {isAdmin});
  } catch (error) {
    console.error('Login error:', error.message);
    Alert.alert('Login Failed', 'User does not exist');
  }
};


 export const onGoogleButtonPress = async (navigation) => {
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
     // console.error('Google Sign-In error:', error.message);
     // Alert.alert('Google Sign-In Failed', error.message);
    }
  };
