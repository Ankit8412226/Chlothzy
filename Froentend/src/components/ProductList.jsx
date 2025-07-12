import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 overflow-hidden">




      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          {/* Section Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-violet-200 shadow-sm mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full"></div>
            <span className="text-sm font-medium text-violet-700">Premium Collection</span>
          </div>

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
        </div>

        {products.length === 0 ? (
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
                Try selecting a different category or check back later for new arrivals.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="transform hover:scale-105 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>
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
