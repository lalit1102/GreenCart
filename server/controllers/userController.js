import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// Register user: api/user/register

export const registerUser = async (req,res) => {
    try {
      const { name, email, password } = req.body

      if(!name || !email || !password){
        return res.json({success:false,message:"All fields are required"})
      }

      const existingUser = await User.findOne({email})
      if(existingUser){
        return res.json({success:false,message:"User already exists"})
      }

      const hashedPassword = await bcrypt.hash(password,10)

      const user = await User.create({
        name,
        email,
        password:hashedPassword
      })

      const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

      res.cookie("token",token,{
        httpOnly:true, // prevent js to accesss cookie
        secure:process.env.NODE_ENV === "production", // use secure cookie in production
        sameSite:process.env.NODE_ENV === "production" ? "none":"strict" , // prevent csrf attacks
        maxAge:7*24*60*60*1000
        })


      
      return res.json({success:true,
        user:{
          name:user.name,
          email:user.email
        },
      })
    } catch (error) {
      console.log(error.message)
      return res.json({success:false,message:"Internal server error"})
    }
}