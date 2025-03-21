import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDishData, loadCart } from '../redux/cartSlice';
import BannerImage from '../components/BannerImage';
import ThaliCard from '../components/ThaliCard';
import ModalScreen from '../screens/ModalScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, signOut } from '@react-native-firebase/auth';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isAdmin = route.params?.isAdmin || false; 
  const auth = getAuth();
  
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  
  
  
  const { cart, thaliData = [], loading, error } = useSelector(state => state.thali);
  const totalItems = cart ? Object.keys(cart).length : 0;
  
  useEffect(() => {
    dispatch(fetchDishData());
    dispatch(loadCart());
  }, [dispatch]);
  
  const toggleModal = () => {                                                                                       
    setModalVisible(!isModalVisible);
  };
  
  const logOut = async () => {
    //  const auth = getAuth();
    //  const user = auth.currentUser;
    
    try {
      const user = auth.currentUser;
        if (user) {
            // Check if the user signed in with Google
            const isGoogleUser = user.providerData.some(
                (provider) => provider.providerId === 'google.com'
            );
 
            if (isGoogleUser) {
                // User signed in with Google
                await GoogleSignin.revokeAccess(); // Revoke Google Access
                await GoogleSignin.signOut(); // Sign out Google account
                console.log('Logged out from Google account');
            }
 
            // Sign out from Firebase Authentication (for all users)
            await signOut(auth);
            console.log('Logged out from Firebase');
 
            // Navigate to login screen
            navigation.navigate('LoginScreen');
        } else {
            console.log('No user is currently logged in');
        }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message || 'An error occurred during logout');
    }
};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topLeftIcon} onPress={logOut}>
      <Text style={styles.topLeftIcon}>{isAdmin ? "A" : "U"}</Text> 
      </TouchableOpacity>
      <BannerImage imageSource={require('../assets/images/banner3.jpg')} />
      <View style={styles.headerRow}>
        <Text style={styles.featuredText}> { isAdmin ? "Available Data" : "Featured Thalis "}</Text>
        {/* <Text style = {styles.iconText}>{isAdmin ? "A" : "U"}</Text> */}

        
        {!isAdmin && (
          
          <TouchableOpacity onPress={toggleModal} style={styles.cartContainer}>
            <Image
              source={require('../assets/icons/menu.png')}
              style={styles.cartIcon}
            />
            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : thaliData.length === 0 ? (
        <Text style={styles.errorText}>No thali data available</Text>
      ) : (
        <FlatList
          data={thaliData}
          keyExtractor={item => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => <ThaliCard thali={item} isAdmin={isAdmin} />}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <ModalScreen isVisible={isModalVisible} onClose={toggleModal} />

      
      {isAdmin && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('uploadDish')}
        >
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'black',
  },
  featuredText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cartContainer: {
    position: 'relative',
    padding: 5,
  },
  cartIcon: {
    width: 24,
    height: 24,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  plusText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },

  topLeftIcon: {
    position: 'absolute',
    top: 10, 
    left: 10, 
    fontSize: 22,
    fontWeight: "bold",
    color: '#ffae42',
    backgroundColor: 'rgba(0,0,0,0.5)', 
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    zIndex: 10, 
  },
});
