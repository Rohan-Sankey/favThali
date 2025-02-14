import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteDish, removeFromCart } from '../redux/cartSlice';
import { useNavigation } from '@react-navigation/native';

const ThaliCard = ({ thali, isAdmin }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.thali.cart);
  const quantity = cart[thali.id]?.quantity || 0;

  const handleUpdate = () => {
    navigation.navigate('uploadDish', { thali });   
  }

  const handleDelete = () => {
    console.log("function called");
    dispatch(deleteDish(thali.id));
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: thali.image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name}>{thali.name}</Text>
        <Text style={styles.price}>₹{thali.price}</Text>

        <View style={styles.buttonContainer}>
          {!isAdmin && quantity > 0 && (
            <>
              <TouchableOpacity 
                onPress={() => dispatch(removeFromCart({ id: thali.id }))} 
                style={styles.removeButton}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
            </>
          )}

          {!isAdmin && (
            <TouchableOpacity 
              onPress={() => dispatch(addToCart(thali))} 
              style={styles.addButton}
            >
              <Text style={styles.buttonText}>{quantity > 0 ? "+" : "Add"}</Text>
            </TouchableOpacity>
          )}

          {isAdmin && (
            <>
              <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
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
    width: 120, 
    height: 120, 
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
  updateButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10, 
    minWidth: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    minWidth: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    minWidth: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  removeButton: {
    backgroundColor: "rgb(218, 86, 86)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    minWidth: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});

export default ThaliCard;
