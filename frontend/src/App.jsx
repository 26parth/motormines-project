import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from "./pages/Contact";
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import MoreProduct from './pages/MoreProduct'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from './components/Footer'
// import { AuthProvider } from "./context/AuthContext
import AuthProvider from "./context/AuthContext";
import YourRoutes from "./components/ProtectedRoute";
import CartProvider from "./context/CartContext";
import Checkout from './pages/Checkout'
import { Toaster } from "react-hot-toast";
// admin side 
import AdminSidebar from "./pages/Admin/AdminSidebar";
import AdminNavbar from "./pages/Admin/AdminNavbar";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminUsers  from "./pages/Admin/AdminUsers";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminSettings from "./pages/Admin/AdminSettings";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";


const App = () => {
  return (
    <>
      {/* <YourRoutesOrComponents />  */}
      <Toaster position="top-center" reverseOrder={false} />  {/* like alert */}

      <AuthProvider>
        <CartProvider>
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
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              {/* <Route path="/orders" element={<Orders/>} /> */}


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


              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout>
                      <AdminOrders />
                    </AdminLayout>
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout>
                      <AdminProducts />
                    </AdminLayout>
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout>
                      <AdminUsers />
                    </AdminLayout>
                  </AdminProtectedRoute>
                }
              />





            </Routes>
          </div>
          {/* <About />
        <Contact /> */}
          {/* <Footer /> */}
        </CartProvider>
      </AuthProvider>

    </>
  )
}

export default App
