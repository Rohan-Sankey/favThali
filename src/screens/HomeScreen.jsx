import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'; 
import BannerImage from '../components/BannerImage';
import ThaliCard from '../components/ThaliCard';
import thaliData from '../Dishes';
import ModalScreen from '../components/ModalScreen';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

 
  const cart = useSelector((state) => state.thali?.cart || {});
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  console.log(totalItems);
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <BannerImage imageSource={require('../assets/images/banner_image.jpg')} />
      <View style={styles.headerRow}>
        <Text style={styles.featuredText}>Featured Thalis</Text>

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
      </View>

      <FlatList
        data={thaliData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ThaliCard thali={item} />}
        contentContainerStyle={styles.listContainer}
      />

      <ModalScreen isVisible={isModalVisible} onClose={toggleModal} />
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
    backgroundColor: '#fff',
  },
  featuredText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
});
