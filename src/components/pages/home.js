// rafce = ket react fomat
import React from 'react'
import NewProduct from '../home/newProduct'
import BestSeller from '../home/bestSeller'

const Home = () => {
  return (
    <div className='container'>
      <h3 className='text-start p-4 mt-6 mb-6 '>สินค้าใหม่ ที่นี่เลย!⭐</h3>
      <NewProduct/>
      <br/> <br/>
      <h3 className='text-start p-4 mt-6 mb-6 '>มาแรงสุด! ขายดีเว่อร์!👀✨</h3>
      <BestSeller/>
    </div>
  )
}

export default Home
