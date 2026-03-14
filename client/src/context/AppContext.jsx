import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext()


export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [isSeller, setIsSeller] = useState(false)
  const [showUserLogin, setShowUserLogin] = useState(false)

  const [searchQuery, setSearchQuery] = useState({})

  // best Selller
  const [products, setProducts] = useState([])

  const [cartItem, setCartItem] = useState({})


  // fetch seller function

  const fetchSeller = async () =>{
    try {
      const {data} = await axios.get("/api/seller/is-auth")
      if(data.success){
        setIsSeller(true)

      } else {
        setIsSeller(false)
      }
    } catch (error) {
      console.log(error)
      setIsSeller(false)

    }
  }

  // fetch user auth status  ,user data and cart item

  const fetchUser = async () => {
    try {
      const {data}= await axios.get("api/user/is-auth")
      if(data.success){
        setUser(data.user)
        setCartItem(data.user.cartItem)
      }
    } catch (error) {
      console.log(error)
      setUser(null)
    }
  }

//fetch all product
  const fetchProducts = async () => {
    try {
      const {data} = await axios.get("/api/product/list")
      if(data.success){
        setProducts(data.products)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // add to cart

  const addToCart = (itemId) => {
    const cartData = structuredClone(cartItem)
    console.log("add to cart", cartData)

    if (cartData[itemId]) {
      cartData[itemId] += 1
    } else {
      cartData[itemId] = 1
    }
    console.log("Inside addToCart (updated):", cartData)
    setCartItem(cartData)
    toast.success("Add to Cart")
  }


  // update cart quenty

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItem)
    cartData[itemId] = quantity
    setCartItem(cartData)
    toast.success("Cart Updated")
  }

  // remove cart data 

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItem)
    if (cartData[itemId]) {
      cartData[itemId] -= 1
      if (cartData[itemId] === 0) {
        delete cartData[itemId]
      }

    }
    toast.success("Remove From Cart")
    setCartItem(cartData)
  }



  // get cart total count
  const getCartCount = () => {
    let totalCount = 0
    for (const item in cartItem) {
      totalCount += cartItem[item];
    }
    return totalCount
  }

  // get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items)
      if (cartItem[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItem[items]
      }
    }
    return Math.floor(totalAmount * 100) / 100
  }


  useEffect(() => {
    fetchUser( )
    fetchSeller()
    fetchProducts()
    
  }, [])


  // update database cart item

useEffect(() => {

  const updateCart = async () => {
    try {
      const { data } = await axios.post("/api/cart/update", { cartItem });

      if (!data.success) {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  if (user) {
    updateCart();
  }

}, [cartItem]);


  const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItem, searchQuery, setSearchQuery, getCartCount, getCartAmount,axios,fetchProducts }
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}