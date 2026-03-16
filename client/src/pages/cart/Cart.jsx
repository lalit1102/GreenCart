import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {

  const {
    products,
    currency,
    cartItem,
    removeFromCart,
    getCartCount,
    getCartAmount,
    updateCartItem,
    navigate,
    axios,
    user,
    setCartItem
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");


 
 


  // get cart items
  const getCart = useCallback(() => {
    let tempArray = [];

    for (const key in cartItem) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItem[key],
        });
      }
    }

    setCartArray(tempArray);
  }, [products, cartItem]);

  // get user address
  const getUserAddress = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios]);




  const placeOrder = async () => {

  try {

    if(!user){
      return toast.error("Please login first")
    }

    if(!selectedAddress){
      return toast.error("Please select address")
    }

    if(cartArray.length === 0){
      return toast.error("Cart is empty")
    }

    if(paymentMethod === "COD"){

      const {data} = await axios.post("/api/order/cod",{
        userId:user?._id,
        items:cartArray.map((item)=>({
          product:item._id,
          quantity:item.quantity
        })),
        address:selectedAddress._id
      })

      if(data.success){
        toast.success(data.message)
        setCartItem({})
        navigate("/my-orders")
      }else{
        toast.error(data.message)
      }

    } else {
      const {data} = await axios.post("/api/order/stripe",{
        userId:user?._id,
        items:cartArray.map((item)=>({
          product:item._id,
          quantity:item.quantity
        })),
        address:selectedAddress._id
      })

      if(data.success){
       window.location.replace(data.url)
      }else{
        toast.error(data.message)
      }
    }

  } catch (error) {
    toast.error(error.message)
  }

}

  useEffect(() => {
    if (products.length > 0 && cartItem) {
      getCart();
    }
  }, [products, cartItem, getCart]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user, getUserAddress]);


  if (products.length === 0) return null;


  return (
    <div className="flex flex-col md:flex-row mt-16">

      {/* LEFT SIDE */}
      <div className="flex-1 max-w-4xl">

        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart
          <span className="text-sm text-green-500/80">
            {" "}({getCartCount()} Items)
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 pb-3">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>


        {cartArray.map((product, index) => (

          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center pt-3"
          >

            <div className="flex items-center gap-4">

              <img
                src={product.image[0]}
                className="w-20 h-20 object-cover border"
                alt={product.name}
              />

              <div>

                <p className="font-semibold">{product.name}</p>

                <div className="flex items-center gap-2">

                  <p>Qty:</p>

                  <select
                    value={product.quantity}
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                  >

                    {Array(10)
                      .fill("")
                      .map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}

                  </select>

                </div>

              </div>

            </div>


            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>


            <button
              onClick={() => removeFromCart(product._id)}
              className="mx-auto"
            >

              <img
                src={assets.remove_icon}
                className="w-6"
                alt="remove"
              />

            </button>

          </div>

        ))}


        <button
          onClick={() => navigate("/products")}
          className="mt-8 text-green-500"
        >
          Continue Shopping →
        </button>

      </div>


      {/* RIGHT SIDE */}

      <div className="max-w-90 w-full bg-gray-100 p-5 border">

        <h2 className="text-xl font-medium">Order Summary</h2>

        <hr className="my-5" />

        <p className="text-sm font-medium">Delivery Address</p>

        <div className="flex justify-between mt-2">

          <p className="text-gray-500">

            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}`
              : "No address found"}

          </p>

          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-green-500"
          >
            Change
          </button>

        </div>


        {showAddress && (

          <div className="bg-white border mt-2">

            {addresses.map((address, index) => (

              <p
                key={index}
                onClick={() => {
                  setSelectedAddress(address);
                  setShowAddress(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >

                {address.street}, {address.city}

              </p>

            ))}

            <p
              onClick={() => navigate("/add-address")}
              className="text-green-500 text-center p-2 cursor-pointer"
            >
              Add address
            </p>

          </div>

        )}


        <p className="text-sm font-medium mt-6">Payment Method</p>

        <select
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border px-3 py-2 mt-2"
        >

          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>

        </select>


        <hr className="my-5" />


        <div className="space-y-2">

          <p className="flex justify-between">
            <span>Price</span>
            <span>{currency}{getCartAmount()}</span>
          </p>

          <p className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </p>

          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency}{getCartAmount() * 0.02}</span>
          </p>

          <p className="flex justify-between font-medium">
            <span>Total</span>
            <span>
              {currency}
              {getCartAmount() + getCartAmount() * 0.02}
            </span>
          </p>

        </div>


        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-green-500 text-white"
        >

          {paymentMethod === "COD"
            ? "Place Order"
            : "Proceed to Payment"}

        </button>

      </div>

    </div>
  );
};

export default Cart;