import React, { useCallback, useEffect, useState } from 'react'
import { useAppContext } from '../../context/useAppContext';


const MyOrders = () => {

  const [myorders, setMyOrders] = useState([]);
  const { currency,axios,user } = useAppContext();

const fetchMyOrders = useCallback(async () => {
    try {

      const { data } = await axios.get("/api/order/user");

      if (data.success) {
        setMyOrders(data.orders);
      }

    } catch (error) {
      console.log(error);
    }
  }, [axios]);

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user, fetchMyOrders]);

  

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="mb-6">
        <p className="text-xl md:text-2xl font-semibold">My Orders</p>
        <div className="w-16 h-1 bg-green-500 mt-2"></div>
      </div>

      {/* Orders */}
      <div className="space-y-6">
        {myorders.map((order, index) => (
          <div key={index} className="border rounded-xl p-4 shadow-sm">

            {/* Order Info */}
            <p className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm md:text-base mb-4">
              <span className="font-medium">OrderId: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span className="font-semibold">
                Total Amount : {currency}{order.amount}
              </span>
            </p>

            {/* Items */}
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t pt-4"
                >

                  {/* Product Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-lg border">
                      <img
                        src={item.product.image[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h2 className="font-semibold text-sm md:text-base">
                        {item.product.name}
                      </h2>
                      <p className="text-xs md:text-sm text-gray-500">
                        Category: {item.product.category}
                      </p>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="text-xs md:text-sm space-y-1">
                    <p>Quantity: {item.quantity || "1"}</p>
                    <p>Status: {order.status}</p>
                    <p>Date: {order.createdAt ? new Date(order.createdAt).toDateString() : "N/A"}</p>
                  </div>

                  {/* Price */}
                  <p className="font-semibold text-sm md:text-base">
                    Amount: {currency}
                    {item.product.offerPrice * item.quantity}
                  </p>

                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default MyOrders