import express from "express"
import { getAllOrders, getUserOrders, placesOrderCOD } from "../controllers/orderController.js"
import authUser from "../middlewares/authUser.js"
import authSeller from "../middlewares/authSeller.js"

const orderRouter = express.Router()

orderRouter.post("/cod",authUser,placesOrderCOD)
orderRouter.get("/user",authUser,getUserOrders)
orderRouter.get("/seller",authSeller,getAllOrders)


export default orderRouter