import order from "../models/order.js"
import product from "../models/product.js";

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