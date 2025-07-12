import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import CartCheckoutFlow from "./components/CartCheckoutFlow";
import CategoryTabs from './components/CategoryTabs';
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (

      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header cart={cart} />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <CategoryTabs
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
                <ProductList
                  products={filteredProducts}
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
            <Route path = "/cart" element = {<CartCheckoutFlow/>} />
            <Route path="/about" element = {<AboutUs/>} />
            <Route path= "/contact" element = {<ContactUs />} />
            <Route path='/products' element = {<ProductsPage/>} />
          </Routes>
        </div>
      </Router>

  );
}

export default App;
