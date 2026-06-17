import Razorpay from "razorpay";
import { config } from "../config/config.js";
const razorpay=new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_KEY_SECRET,
})
  
export async function createOrder({amount,currency="INR"})
{

    const options={
        amount:amount*100,
        currency:currency,
    };
    // why amount *100 aise toh usse pay karna hoga 1000 toh usse pay karna hoga 1000*100 ye toh dhokha hai 
    // are nahi wo currency ka sabse chota unit jaise 1000 rupees nahi hai balki 1000 piase(sabse choti unit of currency)
    // 1000*100 paise = 1000 rupees 
    // 500*100 paise = 500 rupees 
    const order=await razorpay.orders.create(options); 
    console.log(order);
    return order;
}
