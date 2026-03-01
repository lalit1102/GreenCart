import React from 'react'
import MainBanner from '../../components/MainBanner'
import Categieros from '../../components/categieros/Categieros'
import BestSeller from '../../components/Best Seller/BestSeller'
import BottomBanner from '../../components/Bottom Banner/BottomBanner'
import NewsLatter from '../../components/NewsLatter/NewsLatter'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Categieros />
      <BestSeller />
      <BottomBanner />
      <NewsLatter />
    </div>
  )
}

export default Home
