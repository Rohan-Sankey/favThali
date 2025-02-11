import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';

const ThaliCard = ({ thali }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.thali.cart);
  const quantity = cart[thali.id]?.quantity || 0;

  return (
    <View style={styles.card}>
      <Image source={thali.image} style={styles.image} />
      
      <View style={styles.details}>
        <Text style={styles.name}>{thali.name}</Text>
        <Text style={styles.price}>₹{thali.price}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => dispatch(addToCart(thali))} style={styles.addButton}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>

          {quantity > 0 && (
            <>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={() => dispatch(removeFromCart({ id: thali.id }))} style={styles.removeButton}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5cb5c",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    elevation: 5,
    width: "100%", 
    alignSelf: "center",
    flexDirection: "row",
  },
  image: {
    width: 160, 
    height: 160, 
    borderRadius: 10, 
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  price: {
    fontSize: 18,
    color: "green",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
});

export default ThaliCard;
