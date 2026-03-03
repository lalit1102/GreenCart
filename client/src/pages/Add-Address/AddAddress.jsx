import React from 'react'
import { assets } from '../../assets/assets'

const InputField = ({ type, name, placeholder, handleChange, address }) => (

  <input className="w-full px-2 py-2.5 border border-gray-300 rounded outline-none focus:border-green-500 transition"
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={handleChange}
    value={address[name]}
    required />

)

const Addaddress = () => {

  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }))
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(address);
  };


  return (
    <div className='mt-16 pb-16 px-4 sm:px-8 xl:px-0'>
      <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping{' '}
        <span className='font-semibold text-green-500/30'>Address</span>
      </p>
      <div className='flex flex-col-reverse md:flex-row justify-between gap-10 mt-10 md:items-start'>
        <div className='flex-1 w-full max-w-xl'>
          <form onSubmit={onSubmitHandler} className='space-y-4 mt-6 text-sm'>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InputField type="text" name="firstName" placeholder="First Name" handleChange={handleChange} address={address} />
              <InputField type="text" name="lastName" placeholder="Last Name" handleChange={handleChange} address={address} />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InputField type="email" name="email" placeholder="Email" handleChange={handleChange} address={address} />
              <InputField type="text" name="street" placeholder="Street" handleChange={handleChange} address={address} />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InputField type="text" name="city" placeholder="City" handleChange={handleChange} address={address} />
              <InputField type="text" name="state" placeholder="State" handleChange={handleChange} address={address} />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InputField type="text" name="zipCode" placeholder="Zip Code" handleChange={handleChange} address={address} />
              <InputField type="text" name="country" placeholder="Country" handleChange={handleChange} address={address} />
            </div>

            <InputField type="text" name="phone" placeholder="Phone" handleChange={handleChange} address={address} />


            <button type="submit" className='w-full bg-green-500 text-white py-2.5 rounded mt-6 hover:bg-green-600 transition duration-300 cursor-pointer uppercase font-semibold'>save address</button>

          </form>
        </div>
        <div className='w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0'>
          <img src={assets.add_address_iamge} alt="Add Address" className="w-full max-w-sm md:max-w-md object-contain mb-8 md:mb-0" />
        </div>
      </div>
    </div>
  )
}

export default Addaddress