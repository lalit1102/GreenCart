import Address from "../models/Address.js"

// add Address : /api/address/add

export const addAddress = async (req,res) => {
  try {
     const {address,userId} = req.body

     await Address.create({
      ...address,userId
     })
     res.json({
      success:true,
      message:"address added to sucessfully"
     })
  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:error.message
    })
  }
}

export const getAddress = async (req,res) => {
  try {
    const {userId} = req.body
    const addresses = await Address.find({userId})
    
  } catch (error) {
     console.log(error);
    res.json({
      success:false,
      message:error.message
    })
  }
}