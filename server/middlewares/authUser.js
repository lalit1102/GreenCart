import jwt from "jsonwebtoken"

const authUser = (req,res,next)=>{

    const {token} = req.cookies

    if(!token){
        return res.json({
            success:false,
            message:"Unauthorized"
        })
    }

    try {

        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)

        if(!tokenDecode){
            return res.json({
                success:false,
                message:"Unauthorized"
            })
        }

        req.userId = tokenDecode.id

        next()

    } catch (error) {

        console.log(error.message)

        return res.json({
            success:false,
            message:"Internal server error"
        })

    }

}

export default authUser