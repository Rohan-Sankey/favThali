import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice'; 

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.thali.cart) || {};
  const cartItems = Object.values(cart);

  const totalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0),
    [cartItems]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={() => dispatch(clearCart())} style={styles.clearCartButton}>
            <Image source={require('../assets/icons/cart.png')} style={styles.trashIcon} />
          </TouchableOpacity>
        )}
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, { flex: 2 }]}>Item</Text>
            <Text style={styles.headerText}>Price</Text>
            <Text style={styles.headerText}>Qty</Text>
            <Text style={[styles.headerText, { flex: 1.5 }]}>Total</Text>
          </View>

          <FlatList
            data={cartItems}
            keyExtractor={item => (item?.id ? item.id.toString() : Math.random().toString())}
            renderItem={({ item }) =>
              item && item.name ? (
                <View style={styles.cartItem}>
                  <Text style={[styles.itemText, { flex: 2 }]}>{item.name}</Text>
                  <Text style={styles.itemText}>₹{item.price}</Text>
                  <Text style={styles.itemText}>{item.quantity}</Text>
                  <Text style={[styles.itemTotal, { flex: 1.5 }]}>₹{item.price * item.quantity}</Text>
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
    backgroundColor: '#ff3333',
    borderRadius: 8,
  },
  trashIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  // emptyCartText: {
  //   fontSize: 18,
  //   color: '#bbb',
  //   textAlign: 'center',
  //   marginTop: 50,
  // },
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
    borderBottomColor: '#555',
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
    backgroundColor: '#222',
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
    color: '#ff5733',
    flex: 1,
    textAlign: 'center',
  },
  totalContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#333',
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
