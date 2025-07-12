import { ChevronDown, Grid, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';



// Mock data generator
const generateProducts = (startId, count) => {
  const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books'];
  const products = [];

  for (let i = 0; i < count; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: `Eco-Friendly Product ${id}`,
      price: (Math.random() * 200 + 20).toFixed(2),
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 500 + 10),
      category: categories[Math.floor(Math.random() * categories.length)],
      image: `https://picsum.photos/400/300?random=${id}`,
      hoverImage: `https://picsum.photos/400/300?random=${id + 1000}`
    });
  }

  return products;
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);

  const observerRef = useRef();
  const lastProductElementRef = useRef();

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books'];

  // Load initial products
  useEffect(() => {
    const initialProducts = generateProducts(1, 12);
    setProducts(initialProducts);
  }, []);

  // Load more products function
  const loadMoreProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newProducts = generateProducts(products.length + 1, 8);

    if (newProducts.length > 0) {
      setProducts(prev => [...prev, ...newProducts]);
      setPage(prev => prev + 1);

      // Stop loading after 50 products for demo
      if (products.length + newProducts.length >= 50) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (lastProductElementRef.current) {
      observer.observe(lastProductElementRef.current);
    }

    return () => {
      if (lastProductElementRef.current) {
        observer.unobserve(lastProductElementRef.current);
      }
    };
  }, [hasMore, loading, products.length]);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-violet-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <p className="text-sm text-violet-600">
              Cart: {cart.length} items
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                ref={index === filteredProducts.length - 1 ? lastProductElementRef : null}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
              <p className="ml-4 text-gray-600">Loading more products...</p>
            </div>
          )}

          {/* No More Products */}
          {!hasMore && products.length > 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">You've reached the end of our products!</p>
              <button
                onClick={() => {
                  setProducts([]);
                  setPage(1);
                  setHasMore(true);
                  const initialProducts = generateProducts(1, 12);
                  setProducts(initialProducts);
                }}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                Load Fresh Products
              </button>
            </div>
          )}

          {/* No Products Found */}
          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
