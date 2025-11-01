import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from "./pages/Contact";
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/Forgotpassword'
import NewPassword from './pages/NewPassword'
import MoreProduct from './pages/MoreProduct'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from './components/Footer'
import { AuthProvider } from "./context/AuthContext"; 
import YourRoutes from "./components/ProtectedRoute";


const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/moreproduct" element={<MoreProduct />} />

            {/* 👇 Protected routes */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        {/* <About />
        <Contact /> */}
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
