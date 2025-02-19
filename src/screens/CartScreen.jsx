import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {clearCart} from '../redux/cartSlice';
import {handlePayment} from '../RazorPayMock';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.thali.cart) || {};
  const cartItems = Object.values(cart);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const handlePaymentPress = async () => {
    setModalVisible(false);

    try {
      const isSuccess = await handlePayment();
      console.log(isSuccess);

      navigation.navigate('PaymentResultScreen', {result: isSuccess ? 'success' : 'failed'});
      if (isSuccess) dispatch(clearCart());  // clear the cart after successful payment 

    } catch (error) {
      console.log('Payment failed');
    }
  };

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
        0,
      ),
    [cartItems],
    console.log('usememo called ')
  );

  const deliveryCharges = totalPrice * 0.08;
  const totalWithDelivery = totalPrice + deliveryCharges;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity
            onPress={() => dispatch(clearCart())}
            style={styles.clearCartButton}>
            <Image
              source={require('../assets/icons/cart.png')}
              style={styles.trashIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, {flex: 2}]}>Item</Text>
            <Text style={styles.headerText}>Price</Text>
            <Text style={styles.headerText}>Qty</Text>
            <Text style={[styles.headerText, {flex: 1.5}]}>Total</Text>
          </View>

          <FlatList
            data={cartItems}
            keyExtractor={item =>
              item?.id ? item.id.toString() : Math.random().toString()
            }
            renderItem={({item}) =>
              item && item.name ? (
                <View style={styles.cartItem}>
                  <Text style={[styles.itemText, {flex: 2}]}>{item.name}</Text>
                  <Text style={styles.itemText}>₹{item.price}</Text>
                  <Text style={styles.itemText}>{item.quantity}</Text>
                  <Text style={[styles.itemTotal, {flex: 1.5}]}>
                    ₹{item.price * item.quantity}
                  </Text>
                </View>
              ) : null
            }
          />
        </View>
      )}

      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ₹{totalPrice}</Text>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Checkout Summary</Text>

            <View style={styles.modalTable}>
              <View style={styles.modalTableRow}>
                <Text style={styles.modalTableHeader}>Total</Text>
                <Text style={styles.modalTableValue}>
                  ₹{totalPrice.toFixed(2)}
                </Text>
              </View>
              <View style={styles.modalTableRow}>
                <Text style={styles.modalTableHeader}>
                  Delivery Charges (8%)
                </Text>
                <Text style={styles.modalTableValue}>
                  ₹{deliveryCharges.toFixed(2)}
                </Text>
              </View>
              <View style={styles.modalTableRow}>
                <Text style={styles.modalTableHeader}>Total with Delivery</Text>
                <Text style={styles.modalTableValue}>
                  ₹{totalWithDelivery.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handlePaymentPress}>
                <Text style={styles.buttonText}>Confirm Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#121212', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f5cb5c',
  },
  clearCartButton: {
    padding: 8,
    backgroundColor: '#ff6666', 
    borderRadius: 8,
  },
  trashIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  tableContainer: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e', 
    borderRadius: 10,
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Darker border
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5cb5c',
    flex: 1,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a', 
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#fff', 
    flex: 1,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6666',
    flex: 1,
    textAlign: 'center',
  },
  totalContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#1e1e1e', 
    borderRadius: 10,
    alignItems: 'center',
    
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 10,
  },
  paymentButton: {
    backgroundColor: '#ff6666', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    // position : 'static'
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1e1e1e', // Darker modal background
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f5cb5c', // Soft yellow for modal title
    textAlign: 'center',
    marginBottom: 15,
  },
  modalTable: {
    marginBottom: 20,
    marginTop: 20,
  },
  modalTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 5,
  },
  modalTableHeader: {
    fontSize: 16,
    color: '#f5cb5c', 
    fontWeight: 'bold',
  },
  modalTableValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#333', 
    padding: 10,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: '#ff6666', 
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});