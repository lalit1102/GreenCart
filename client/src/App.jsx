import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login/Login'
import AllProducts from './pages/AllProducts/AllProducts'
import ProductCategory from './pages/Product-category/ProductCategory'
import ProductDetails from './pages/product-Details/ProductDetails'
import Cart from './pages/cart/Cart'
import AddAddress from './pages/Add-Address/Addaddress'
import MyOrderS from './pages/MyOrders/MyOrders'

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller")
  const { showUserLogin } = useAppContext()

  return (
    <div>
      {isSellerPath ? "" : <Navbar />}
      {/* {!isSellerPath && <Navbar />} */}

      {showUserLogin ? <Login /> : null}

      <Toaster />

      <div className={`${isSellerPath ? "" : "px-16 md:px-16 lg:px-16 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrderS />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
