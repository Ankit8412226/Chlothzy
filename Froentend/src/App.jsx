import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import AuthPages from './components/Auth';
import CartCheckoutFlow from "./components/CartCheckoutFlow";
import ContactUs from "./components/ContactUs";
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Newsletter from './components/Newsletter';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import ProductsPage from './components/ProductsPage';
import { products } from './data/products';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        toast.success(`${product.name} quantity increased`);
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${product.name} added to cart`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };



  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header cart={cart} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />

              <ProductList

                onAddToCart={addToCart}
              />
              <Newsletter />
              <Footer />
            </>
          } />
          <Route path="/product/:id" element={
            <ProductDetail
              products={products}
              onAddToCart={addToCart}
            />
          } />
          <Route path="/cart" element={<CartCheckoutFlow />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/products" element={<ProductsPage  onAddToCart={addToCart} />} />
          <Route path="/auth" element={<AuthPages />} />
        </Routes>


        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </Router>
  );
}

export default App;
