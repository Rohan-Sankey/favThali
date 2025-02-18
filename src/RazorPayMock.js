import RazorpayCheckout from 'react-native-razorpay';

import axios from 'axios';
import {current} from '@reduxjs/toolkit';

const createRazorpayOrder = async amount => {
  try {
    const response = await axios.post(
      'https://api.razorpay.com/v1/orders',
      
       {
          amount: amount * 100,
          currency: 'INR',
          receipt: 'order_rcptid_11',
          payment_capture :1
        }, 
        {
          auth: {
            username: 'rzp_test_yTc0UQzy4c9xCd',
            password: 'eJashng0TNWxkrmvW2FXEMZw',
          },
        },
    );

    
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.log('error in creating order id :', error);
    return null;
  }
};

export const handlePayment = async () => {
    console.log('function called ')
  try {
    const orderData = await createRazorpayOrder(5000);

    if (orderData) {
      const options = {
        description: 'Test Payment ',
        image:
          'https://img.freepik.com/free-psd/3d-space-rocket-with-smoke_23-2148938939.jpg?t=st=1739865497~exp=1739869097~hmac=5cc3f4fdfd16d214298a905296291051e49cca48e1a5ce19e9b5047aeb36ac14&w=740',
        currency: 'INR',
        key: 'rzp_test_yTc0UQzy4c9xCd',
        order_id: orderData.id,
        prefill: {
          name: 'Rohan Kashid',
          email: 'rohankashid25753@gmail.com',
          contact: '09876543321',
        },
        theme: {color: '#f37254'},
      };

      return new Promise((resolve) => {
        RazorpayCheckout.open(options)
          .then(data => {
            console.log('Payment successful!', data);
            resolve(true); 
          })
          .catch(error => {
            console.log('Payment failed!', error);
            resolve(false); 
          });
      }).catch(error => {
        console.log('Payment failed!', error);
        resolve(false); 
      });
    };
  } catch (error) {
    console.log('error in processing payment ', error);
  }
};

// export default handlePayment();