import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import Modal from 'react-native-modal';
import CartScreen from '../screens/CartScreen';

const CartModal = ({isVisible, onClose}) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isVisible) {
          onClose();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [isVisible]);

  

  return (
    
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Go To Cart</Text>
        <CartScreen />
        <TouchableOpacity style={styles.Button} onPress={onClose}>
          <Text style={styles.ButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}>
          onPress = {() => navigation.navigate('CartScreen')}
          <Text style={styles.ButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CartModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  Button: {
    backgroundColor: '#ff5722',
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
