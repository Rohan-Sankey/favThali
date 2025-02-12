import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';

const CartScreen = () => {
  const cart = useSelector(state => state.thali.cart) || {};
  const cartItems = Object.values(cart);

  const totalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0),
    [cartItems]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => (item?.id ? item.id.toString() : Math.random().toString())}
          renderItem={({ item }) =>
            item && item.name ? (
              <View style={styles.cartItem}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price} x {item.quantity}</Text>
                </View>
                <Text style={styles.totalItemPrice}>₹{item.price * item.quantity}</Text>
              </View>
            ) : null
          }
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ₹{totalPrice}</Text>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => Alert.alert('Functionality to be implemented later...')}
          >
            <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  emptyCartText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 50,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff7db',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    height: 60,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#555',
  },
  totalItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff5733',
  },
  totalContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#ffeb99',
    borderRadius: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  paymentButton: {
    backgroundColor: '#ff5733',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
