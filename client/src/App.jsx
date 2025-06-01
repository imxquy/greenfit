import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import ResetPassword from './components/ResetPassword'

import Home from './pages/Home'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import Loading from './components/Loading'

import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'

import { useAppContext } from './context/AppContext'

const App = () => {
  const location = useLocation()
  const isSellerPath = location.pathname.includes('seller')
  const isResetPasswordPath = location.pathname.includes('reset-password')
  const { showUserLogin, isSeller } = useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {!isSellerPath && !isResetPasswordPath && <Navbar />}
      {showUserLogin && <Login />}

      <Toaster />

      <div className={`${isSellerPath || isResetPasswordPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32 py-4"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/loader' element={<Loading />} />
          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && !isResetPasswordPath && <Footer />}
    </div>
  )
}

export default App
