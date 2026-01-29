import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SellerDashboard from './pages/SellerDashboard';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import BestSellers from './components/BestSellers';
import WhyBest from './components/WhyBest';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ExploreDeals from './components/ExploreDeals';
import AllProducts from './pages/AllProducts';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';
import Login from './pages/Login';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import AddAddress from './pages/AddAddress';
import { Toaster } from 'react-hot-toast';


import AdminRoute from './components/AdminRoute';
import SellerLogin from './pages/SellerLogin';

/**
 * Main Home Page Component
 */
const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ExploreDeals />
        <Categories />
        <BestSellers />
        <WhyBest />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

/**
 * Root Application Component
 */
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <SellerDashboard />
            </AdminRoute>
          }
        />



      </Routes>
    </div>
  );
}

export default App;
