import order from "../models/order.js"
import product from "../models/product.js";
import Stripe from "stripe";

export const placesOrderCOD = async (req,res) => {
  try {
    const {userId,items,address} = req.body;
    if(!address || items.length === 0){
      return res.json({
        success:false,
        message:"invalid data"
      })
    }

    // calculate data
    let amount = await items.reduce(async(acc,item)=>{
      const productData = await product.findById(item.product)
      return (await acc) + productData.offerPrice * item.quantity
    },0)

    // add tax charge(2%)
    amount += Math.floor(amount*0.02)

    await order.create({
      userId,
      items,amount,address,
      paymentType:"COD"
    })
      return res.json({
        success:true,
        message:"order placed successfully"
      })
  } catch (error) {
    console.log(error)
    res.json({
      success:false,
      message:error.message
    })
    
  }
}


// stripe online orrder /api/order/stripe
export const placesOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "invalid data" });
    }

    // Fetch product details
    const productData = await Promise.all(
      items.map(async (item) => {
        const prod = await product.findById(item.product);
        return {
          ...prod._doc,
          quantity: item.quantity,
        };
      })
    );

    // Calculate total amount
    let amount = productData.reduce(
      (acc, item) => acc + item.offerPrice * item.quantity,
      0
    );
    amount += Math.floor(amount * 0.02); // tax 2%

    // Create order in DB
    const createdOrder = await order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    // Initialize Stripe
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Prepare line items for Stripe
    const line_items = productData.map((item) => ({
      price_data: {
        currency: "usd", // or your currency
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.offerPrice * 100), // in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: createdOrder._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
//all order by user id : /api/order/user

export const getUserOrders = async (req,res) =>{
  try {
    const {userId} = req.body
    const orders = await order.find({
      userId,
      $or : [{paymentType:"COD"},{Ispaid: true}]
    }).populate("items.product address").sort({createAt:-1})
    res.json({
      success:true,
      message:"successfull",
      orders
    })
  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:error.message
    })
    
  }
}


// get all order data: /api/order/seller

export const getAllOrders = async (req,res) =>{
  try {
    
    const orders = await order.find({
      $or : [{paymentType:"COD"},{Ispaid: true}]
    }).populate("items.product address").sort({createAt:-1})
    res.json({
      success:true,
      message:"successfull",
      orders
    })
  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:error.message
    })
    
  }
}