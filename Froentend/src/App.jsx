import { useEffect, useState } from 'react';
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
import api from './services/axios';

function App() {
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  // Fetch cart on app load
  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        try {
          const response = await api.get(`/orders/cart/${user._id}`);
          const backendCart = response.data;

          if (backendCart && backendCart.items) {
            // Transform backend cart to frontend format
            const frontendCart = backendCart.items.map(item => ({
              ...item.productId,
              quantity: item.quantity,
              _id: item.productId._id // Ensure _id is available
            }));

            setCart(frontendCart);
          }
        } catch (error) {
          console.error('Failed to fetch cart:', error);
          // Don't show error toast on app load, just log it
        }
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (product, quantity = 1) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      toast.error("Please login to add items to cart.");
      return;
    }

    setCartLoading(true);

    try {
      const payload = {
        userId: user._id,
        productId: product._id,
        quantity: quantity, // Use the quantity parameter
      };

      const response = await api.post('/orders/cart', payload);
      const updatedCart = response.data;

      // Find the updated item using _id (consistent with backend)
      const updatedItem = updatedCart.items.find(item =>
        item.productId.toString() === product._id.toString() ||
        item.productId._id?.toString() === product._id.toString()
      );

      if (updatedItem) {
        const existingItemIndex = cart.findIndex(item =>
          item._id === product._id || item._id?.toString() === product._id.toString()
        );

        if (existingItemIndex > -1) {
          // Update existing item quantity
          toast.success(`${product.name} quantity updated to ${updatedItem.quantity}`);
          setCart(prev =>
            prev.map(item =>
              (item._id === product._id || item._id?.toString() === product._id.toString())
                ? { ...item, quantity: updatedItem.quantity }
                : item
            )
          );
        } else {
          // Add new item to cart
          toast.success(`${product.name} (${quantity}) added to cart`);
          setCart(prev => [...prev, {
            ...product,
            quantity: updatedItem.quantity,
            _id: product._id
          }]);
        }
      } else {
        // Fallback: refresh entire cart
        const cartResponse = await api.get(`/orders/cart/${user._id}`);
        const backendCart = cartResponse.data;

        if (backendCart && backendCart.items) {
          const frontendCart = backendCart.items.map(item => ({
            ...item.productId,
            quantity: item.quantity,
            _id: item.productId._id
          }));

          setCart(frontendCart);
          toast.success(`${product.name} (${quantity}) added to cart`);
        }
      }

    } catch (error) {
      console.error('❌ Add to cart error:', error);

      // Better error handling
      if (error.response?.status === 401) {
        toast.error('Please login to add items to cart');
      } else if (error.response?.status === 404) {
        toast.error('Product not found');
      } else {
        toast.error('Failed to add item to cart. Please try again.');
      }
    } finally {
      setCartLoading(false);
    }
  };


  const removeFromCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      toast.error("Please login to manage cart.");
      return;
    }

    try {
      await api.delete(`/orders/cart/${user._id}/${productId}`);

      setCart(prev => prev.filter(item =>
        item._id !== productId && item._id?.toString() !== productId.toString()
      ));

      toast.success('Item removed from cart');
    } catch (error) {
      console.error('❌ Remove from cart error:', error);
      toast.error('Failed to remove item from cart');
    }
  };


  const updateCartQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      toast.error("Please login to manage cart.");
      return;
    }

    try {
      const payload = {
        userId: user._id,
        productId: productId,
        quantity: newQuantity,
        updateType: 'set' // New parameter to indicate setting quantity instead of adding
      };

      const response = await api.put('/orders/cart', payload);
      const updatedCart = response.data;

      // Update local cart state
      setCart(prev =>
        prev.map(item =>
          (item._id === productId || item._id?.toString() === productId.toString())
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      toast.success('Cart updated');
    } catch (error) {
      console.error('❌ Update cart error:', error);
      toast.error('Failed to update cart');
    }
  };


  const clearCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      return;
    }

    try {
      await api.delete(`/orders/cart/${user._id}`);
      setCart([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('❌ Clear cart error:', error);
      toast.error('Failed to clear cart');
    }
  };


  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);


  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header
          cart={cart}
          cartItemCount={cartItemCount}
          cartTotal={cartTotal}
          cartLoading={cartLoading}
        />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProductList
                onAddToCart={addToCart}
                cartLoading={cartLoading}
              />
              <Newsletter />
              <Footer />
            </>
          } />
          <Route path="/product/:id" element={
            <ProductDetail
              products={products}
              onAddToCart={addToCart}
              cartLoading={cartLoading}
            />
          } />
          <Route path="/cart" element={
            <CartCheckoutFlow
              cart={cart}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
              cartTotal={cartTotal}
            />
          } />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/products" element={
            <ProductsPage
              onAddToCart={addToCart}
              cartLoading={cartLoading}
            />
          } />
          <Route path="/auth" element={<AuthPages />} />
        </Routes>

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
