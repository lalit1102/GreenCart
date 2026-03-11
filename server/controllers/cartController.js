import User from "../models/User.js"

// update cart
export const updateCart = async (req,res) => {
  try {

    const { userId, cartItem } = req.body

    if(!userId){
      return res.json({
        success:false,
        message:"User ID not found"
      })
    }

    await User.findByIdAndUpdate(
      userId,
      { cartItem },
      { new:true }
    )

    res.json({
      success:true,
      message:"Cart updated successfully"
    })

  } catch (error) {

    console.log(error.message)

    res.json({
      success:false,
      message:error.message
    })

  }
}