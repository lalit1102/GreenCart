import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate,axios } = useAppContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitHandler = async (event) => {
   try {
     event.preventDefault()
     const {data} = await axios.post("/api/seller/login",{email,password})
     if(data.success){
      setIsSeller(true)
      navigate("/seller")

     } else {
      toast.error(data.message)
     }

   } catch (error) {
    toast.error(error.message)
   }
   
  }

  useEffect(() => {
    if (isSeller) {
      navigate("/seller")
    }
  }, [isSeller])

  return !isSeller && (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          <span className="text-green-500">Seller</span>{" "}
          <span className="text-gray-700">Login</span>
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="admin@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-md font-medium transition duration-200"
          >
            Login
          </button>

        </form>
      </div>

    </div>
  )
}

export default SellerLogin