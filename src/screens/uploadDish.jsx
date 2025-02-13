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
import {uploadDish, updateDish} from '../redux/cartSlice';
import { useNavigation, useRoute } from '@react-navigation/native';

const UploadDish = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const[Thali , setThali] = useState(
    route.params ?.thali || { id: '', name: '', price: '', image: '' }
  )

  const isUpdate = route.params?.thali ? true : false ;


  const handleChange = (key, value) => {
    setThali({...Thali, [key]: value});
  };

  const handleSubmit = async () => {
    if (!Thali.id || !Thali.image || !Thali.name || !Thali.price) {
      Alert.alert('All fields are necessary');
      return;
    }

    try {
      if(isUpdate){
        await dispatch(updateDish(Thali)); 
        Alert.alert('Thali Updted !');
      } else {
      await dispatch(uploadDish(Thali));
      Alert.alert('Thali uploaded!');
      }

      navigation.goBack();
      setThali({id: '', name: '', price: '', image: ''});
    } catch (error) {
      Alert.alert('error uploading thali ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {isUpdate ? 'Update Dish' : 'Upload New Dish'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish ID"
        placeholderTextColor="gray"
        value={Thali.id}
        onChangeText={text => handleChange('id', text)}
        keyboardType="numeric"
       // editable = {!isUpdate} //only editable while uploading
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
        <Text style={styles.buttonText}>{isUpdate? 'Update thali' : 'Upload Thali'}</Text>
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
