import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BannerImage from '../components/BannerImage';
import ThaliCard from '../components/ThaliCard';
import thaliData from '../Dishes';
import CartModal from '../components/ModalScreen'; 
import ModalScreen from '../components/ModalScreen';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <BannerImage imageSource={require('../assets/images/banner_image.jpg')} />
      <View style={styles.headerRow}>
        <Text style={styles.featuredText}>Featured Thalis</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            source={require('../assets/icons/menu.png')}
            style={styles.cartIcon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={thaliData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ThaliCard thali={item} />}
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
  cartIcon: {
    width: 24,
    height: 24,
  },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});
