import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';

const PaymentMethods = () => {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Choose your Payment Method</Text>
      <View style={styles.radioGroup}>
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option1"
            status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedValue('option1')}
            color="#007Bff"
          />
          <Text style={styles.radioLabel}>Cash On Delivery</Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option2"
            status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedValue('option2')}
            color="#007Bff"
          />
          <Text style={styles.radioLabel}>Credit / Debit Card</Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option3"
            status={selectedValue === 'option3' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedValue('option3')}
            color="#007Bff"
          />
          <Text style={styles.radioLabel}>UPI</Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  mainContainer: {
    flex : 1,
    backgroundColor : '#f5f5f5',
    justifyContent : 'center',
    alignItems : 'center',
    padding : 20
  },
  radioGroup: {
    width : '100%',
    // maxWidth : 400,
    flexDirection : 'column',
    //alignItems:'center',
    justifyContent : 'space-around',
    marginTop :20,
    borderRadius : 10,
    backgroundColor:'white',
    padding : 16,
    elevation : 4,
    shadowColor : '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity : 0.2,
    shadowRadius : 4
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    fontWeight : 'bold',
    marginBottom : 10
  },
  radioButton:{
    flexDirection: 'row',
    alignItems : 'center',
    marginVertical : 5
  },
  radioLabel:{
    fontSize : 16,
    color : '#333',
    marginLeft : 8
  }
});
