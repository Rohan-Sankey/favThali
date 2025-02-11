import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet , Button , Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../redux/cartSlice';

const CartScreen = () => {
  const cart = useSelector(state => state.thali.cart);
  const dispatch = useDispatch();

  const cartItems = Object.values(cart);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                ₹{item.price} x {item.quantity}
              </Text>

              <Text style={styles.quantityText}>{item.quantity * item.price}</Text>
            </View>
          )}
        />
      )}

      <View>
      <Text style={styles.totalText}>Total: ₹{totalPrice}</Text>
      <Button
      title='Proceed To Payment '
      onPress={
        ()=>{
            Alert.alert('Functionality to be implemented later...')
        }
      }
      />
      </View>

      
    
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  emptyCartText: {fontSize: 18, color: '#777', textAlign: 'center'},
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemName: {fontSize: 18, fontWeight: 'bold'},
  itemPrice: {fontSize: 16, color: '#333'},
  quantityText: {fontSize: 16, fontWeight: 'bold', marginHorizontal: 5},
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom :80
  },
});
