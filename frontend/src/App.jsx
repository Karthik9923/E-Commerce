import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop'
import WorkshopPage from './pages/WorkShopPage'
import Career from './pages/Career'
import WorkshopsGallery from './components/WorkShopsGallery'
import BlogPage from './pages/BlogPage'
import BlogPostDetail from './components/BlogPostDetail'
import EnquiryPage from './pages/EnquiryPage'
import QuickSearch from './components/QuickSearch'
import CategoryProductPage from './pages/CategoryProductPage'
import CreateYourOwnKit from './pages/CreateYourOwnKit'
import PlaceKitOrder from './pages/PlaceKitOrder'
import KitOrderDetails from './pages/KitOrderDetail'
import KitOrders from './pages/KitOrders'

const App = () => {
  return (
    <>
    <Header/>
    <div className=' sm:px-[5vw] md:px-[7vw] lg:px-[9vw]' >
      <ToastContainer />
      <Navbar/>
      <SearchBar />
        <ScrollToTop /> 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collections' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path="/workshops" element={<WorkshopsGallery />} />
        <Route path="/workshops/:id" element={<WorkshopPage />} />
        <Route path='/career' element={<Career />}/>
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogPostDetail />} />
        <Route path='/enquiry' element={<EnquiryPage />}></Route>
        <Route path='/quicksearch' element={<QuickSearch />}></Route>
        <Route path="/category" element={<CategoryProductPage />} />
        <Route path="/kit" element={<CreateYourOwnKit />} />
        <Route path="/kit-place-order" element={<PlaceKitOrder />} />
        <Route path="/kit-orders/:id" element={<KitOrderDetails />} />
        <Route path="/kit-orders" element={<KitOrders />} />
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App