import { ChevronDown, Grid, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';

import toast from 'react-hot-toast';
import api from '../services/axios';

const ProductsPage = ({onAddToCart}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState([]);

  // Frontend pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); // Products per page
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef();
  const lastProductElementRef = useRef();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category/');
        const categoryData = response.data?.categories || [];

        const allCategories = [
          { _id: '', name: 'All' }, // Manual "All" tab
          ...categoryData
        ];

        setCategories(allCategories);
      } catch (error) {
        toast.error('Failed to load categories');
        console.error('Category fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);

      try {
        const endpoint = selectedCategory
          ? `/products/?categoryId=${encodeURIComponent(selectedCategory)}`
          : `/products/`;

        const response = await api.get(endpoint);
        const fetchedProducts = response.data?.products || [];

        setProducts(fetchedProducts);
        setCurrentPage(1);
        setHasMore(fetchedProducts.length > productsPerPage);
      } catch (error) {
        toast.error('Failed to load products');
        console.error('Products fetch error:', error);
        setProducts([]);
        setHasMore(false);
      } finally {
        setProductsLoading(false);
      }
    };

    if (!loading) {
      fetchProducts();
    }
  }, [selectedCategory, loading]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSearchTerm(''); // Clear search when category changes
  };

  // Filter & sort products (frontend only for search and sort)
  const filteredProducts = products
    .filter((p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price || 0) - parseFloat(b.price || 0);
        case 'price-high':
          return parseFloat(b.price || 0) - parseFloat(a.price || 0);
        case 'rating':
          return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });

  // Get paginated products for display (computed value, no side effects)
  const displayedProducts = filteredProducts.slice(0, currentPage * productsPerPage);

  // Update hasMore when filteredProducts or currentPage changes
  useEffect(() => {
    const endIndex = currentPage * productsPerPage;
    setHasMore(endIndex < filteredProducts.length);
  }, [filteredProducts.length, currentPage, productsPerPage]);

  // Load more products (pagination)
  const loadMoreProducts = () => {
    if (productsLoading || !hasMore) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!lastProductElementRef.current || displayedProducts.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !productsLoading) {
        loadMoreProducts();
      }
    }, { threshold: 1.0 });

    observer.observe(lastProductElementRef.current);

    return () => {
      if (lastProductElementRef.current) {
        observer.unobserve(lastProductElementRef.current);
      }
    };
  }, [displayedProducts, hasMore, productsLoading]);

  // Updated addToCart function with quantity handling
  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id || item._id === product._id);
      if (existingItem) {
        toast.success(`${product.name} quantity increased`);
        return prev.map(item =>
          (item.id === product.id || item._id === product._id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${product.name} added to cart`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
    setCurrentPage(1);
  };

  // Get total items in cart (considering quantities)
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading ) {
    return (
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
    );
  }

  if (productsLoading ) {
    return (
      <div className="text-center py-20 bg-white">
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
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-violet-200">
              <Grid className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">Our Products</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Eco-Friendly
                <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Products
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our curated collection of sustainable products that make a difference for you and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category._id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    selectedCategory === category._id
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white/80 text-gray-600 hover:bg-violet-100 border border-violet-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="appearance-none bg-white/80 border border-violet-200 rounded-xl px-4 py-3 pr-8 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-200"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {displayedProducts.length} of {filteredProducts.length} products
            </p>
            <p className="text-sm text-violet-600">
              Cart: {totalCartItems} items
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {productsLoading && displayedProducts.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
              <p className="ml-4 text-gray-600">Loading products...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {displayedProducts.map((product, index) => (
                  <div
                    key={product._id || product.id}
                    ref={index === displayedProducts.length - 1 ? lastProductElementRef : null}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={addToCart}
                    />
                  </div>
                ))}
              </div>

              {/* Loading More Indicator */}
              {productsLoading && displayedProducts.length > 0 && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
                  <p className="ml-4 text-gray-600">Loading more products...</p>
                </div>
              )}

              {/* No More Products */}
              {!hasMore && displayedProducts.length > 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">You've reached the end of our products!</p>
                </div>
              )}

              {/* No Products Found */}
              {displayedProducts.length === 0 && !productsLoading && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
