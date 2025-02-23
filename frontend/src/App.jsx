/* eslint-disable no-unused-vars */

import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import PlaceOrder from "./pages/PlaceOrder"
import Product from "./pages/Product"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import PaymentStatusPage from "../src/pages/PaymentStatusPage.jsx";

import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <Router>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
        <ToastContainer/>
        <Navbar />
        <SearchBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/collection' element={<Collection/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/place-order' element={<PlaceOrder/>} />
          <Route path='/product/:productId' element={<Product/>} />
          <Route path="/payment" element={<PaymentStatusPage />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
