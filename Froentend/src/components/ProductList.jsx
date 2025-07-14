import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';
import ProductCard from './ProductCard';

const ProductList = ({ onAddToCart, cartLoading }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category/');
        // Store full category objects instead of just names
        setCategories(response.data?.categories || []);
      } catch (error) {
        toast.error('Failed to load categories');
        console.error('Category fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);
      try {
        const endpoint = selectedCategory
          ? `/products/?categoryId=${encodeURIComponent(selectedCategory)}`
          : '/products/';
        const response = await api.get(endpoint);
        const allProducts = response.data?.products || [];

        // Ensure each product has the required fields including _id
        const formattedProducts = allProducts.slice(0, 10).map(product => ({
          ...product,
          _id: product._id || product.id, // Ensure _id is available
          id: product._id || product.id // Keep both for compatibility
        }));

        setProducts(formattedProducts);

      } catch (error) {
        toast.error('Failed to load products');
        console.error('Products fetch error:', error);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleViewAll = () => {
    navigate('/products');
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory) return '';
    const category = categories.find(cat => cat._id === selectedCategory);
    return category ? category.name : '';
  };

  // Handle add to cart with loading state
  const handleAddToCart = async (product) => {
    // Ensure product has _id
    if (!product._id && !product.id) {
      toast.error('Product ID is missing');
      return;
    }

    const productWithId = {
      ...product,
      _id: product._id || product.id
    };

    await onAddToCart(productWithId);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        <div className="text-center mb-16">

          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-violet-200 shadow-sm mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full"></div>
            <span className="text-sm font-medium text-violet-700">Premium Collection</span>
          </div>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 mb-8">
            Discover our curated collection of sustainable products
          </p>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-violet-600"></div>
                <span className="text-gray-500">Loading categories...</span>
              </div>
            ) : (
              <>
                {/* All Products Button */}
                <button
                  onClick={() => handleCategoryChange('')}
                  disabled={productsLoading}
                  className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedCategory === ''
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-violet-600 shadow-md hover:shadow-xl border border-violet-200/50'
                  }`}
                >
                  {selectedCategory !== '' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}

                  {selectedCategory === '' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}

                  <span className="relative z-10">All Products</span>
                </button>

                {/* Category Buttons */}
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryChange(category._id)}
                    disabled={productsLoading}
                    className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedCategory === category._id
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-violet-600 shadow-md hover:shadow-xl border border-violet-200/50'
                    }`}
                  >
                    {selectedCategory !== category._id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}

                    {selectedCategory === category._id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}

                    <span className="relative z-10">{category.name}</span>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div className="text-center mb-16">
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured
            <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated selection of eco-friendly products that combine
            sustainability with style and functionality.
          </p>

          {/* Show selected category */}
          {selectedCategory && getSelectedCategoryName() && (
            <div className="mt-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-violet-100 text-violet-800">
                Showing: {getSelectedCategoryName()}
              </span>
            </div>
          )}
        </div>

        {productsLoading ? (
          <div className="text-center py-20">
            <div className="relative inline-block mb-8">
              <div className="text-6xl mb-4 relative z-10 animate-spin">⚡</div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-xl opacity-20 scale-150"></div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 max-w-lg mx-auto border border-white/50 shadow-xl">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Loading Products...
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Please wait while we fetch the latest products for you.
              </p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative inline-block mb-8">
              <div className="text-8xl mb-4 relative z-10">🌱</div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-xl opacity-20 scale-150"></div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 max-w-lg mx-auto border border-white/50 shadow-xl">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                No Products Found
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {selectedCategory
                  ? `No products found in ${getSelectedCategoryName()} category. Try selecting a different category.`
                  : 'No products available at the moment. Please check back later for new arrivals.'
                }
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div
                  key={product._id || product.id}
                  className="transform hover:scale-105 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    cartLoading={cartLoading}
                  />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <button
                onClick={handleViewAll}
                className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <span className="relative z-10">View All Products</span>

                <svg
                  className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Decorative Elements */}
        {products.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-violet-200 shadow-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                All products are 100% eco-friendly and sustainably sourced
              </span>
            </div>
          </div>
        )}

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-2 h-2 bg-violet-400 rounded-full opacity-40 animate-ping"></div>
        <div className="absolute top-1/3 right-12 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50 animate-bounce"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .grid > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default ProductList;
