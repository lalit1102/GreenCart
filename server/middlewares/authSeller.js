import jwt from "jsonwebtoken"

const authSeller = async (req,res,next) =>{
  const { sellerToken } = req.cookies;

  if(!sellerToken){
    return res.json({
      success:false,
      message: "not authorized"
    })
  }
  try {
      const tokenDecode = jwt.verify(sellerToken,process.env.JWT_SECRET)
     if(tokenDecode.email === process.env.SELLER_EMAIL){
      next()
     } else {
      return res.json({
        success:false,
        message:"not autorized"
      })
     }
           
     
  } catch (error) {
     console.log(error.message)

        return res.json({
            success:false,
            message:"Internal server error"
        })

  }
}

export default authSeller