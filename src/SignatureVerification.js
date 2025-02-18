import crypto from 'crypto';

const verifySignature = (order_id, payment_id , signature)=>{
    const secret_key = 'eJashng0TNWxkrmvW2FXEMZw';
    const body = `${order_id}|${payment_id}`;

    const generated_signature = crypto
    .createHmac('sha256', secret_key)
    .update(body)
    .digest('hex');

    return generated_signature === signature;
};

const handlePaymentSuccess = (data)=>{

    const {razorpay_order_id , razorpay_payment_id , razorpay_signature} = data;    

    if(verifySignature(razorpay_order_id , razorpay_payment_id , razorpay_signature)){
        console.log('payment verified : ' , 'signature is valid ')
    } else {
        console.log('payment verification failed :' , 'signature is invalid ')
    }

}