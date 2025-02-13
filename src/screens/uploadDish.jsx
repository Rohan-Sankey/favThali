import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {uploadDish} from '../redux/cartSlice';

const UploadDish = () => {
  const dispatch = useDispatch();

  const [Thali, setThali] = useState({
    id: '',
    name: '',
    price: '',
    image: '',
  });

  const handleChange = (key, value) => {
    setThali({...Thali, [key]: value});
  };

  const handleSubmit = async () => {
    if (!Thali.id || !Thali.image || !Thali.name || !Thali.price) {
      Alert.alert('All fields are necessary');
      return;
    }

    try {
      await dispatch(uploadDish(Thali));

      Alert.alert('Thali uploaded!');

      setThali({id: '', name: '', price: '', image: ''});
    } catch (error) {
        Alert.alert('error uploading thali ' , error.message)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload New Dish</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish ID"
        placeholderTextColor="gray"
        value={Thali.id}
        onChangeText={text => handleChange('id', text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        placeholderTextColor="gray"
        value={Thali.name}
        onChangeText={text => handleChange('name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Price (₹)"
        placeholderTextColor="gray"
        value={Thali.price}
        onChangeText={text => handleChange('price', text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Image URL"
        placeholderTextColor="gray"
        value={Thali.image}
        onChangeText={text => handleChange('image', text)}
      />

      {Thali.image ? (
        <Image source={{uri: Thali.image}} style={styles.imagePreview} />
      ) : null}

      <TouchableOpacity style={styles.uploadButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Upload Thali</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadDish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: 'black',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  uploadButton: {
    backgroundColor: '#ff4500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
