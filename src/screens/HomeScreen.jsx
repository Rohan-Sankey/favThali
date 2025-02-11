import React from 'react';
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

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BannerImage imageSource={require('../assets/images/banner_image.jpg')} />

      <View style={styles.headerRow}>
        <Text style={styles.featuredText}>Featured Thalis</Text>
        <TouchableOpacity onPress = {() => navigation.navigate('Cart')} >
          <Image source={require('../assets/icons/menu.png')} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={thaliData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ThaliCard thali={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  featuredText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cartButton: {
    backgroundColor: '#ff5722',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 2,
  },
  cartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
