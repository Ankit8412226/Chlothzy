import { categories } from '../data/products';

const CategoryTabs = ({ selectedCategory, onCategoryChange }) => {
  return (
    <section className="py-12 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">


      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            Discover our curated collection of sustainable products
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-violet-600 shadow-md hover:shadow-xl border border-violet-200/50'
              }`}
            >
              {/* Hover effect overlay */}
              {selectedCategory !== category && (
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}

              {/* Active category glow effect */}
              {selectedCategory === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}

              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-8 w-2 h-2 bg-violet-400 rounded-full opacity-40 animate-ping"></div>
        <div className="absolute top-1/3 right-12 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50 animate-bounce"></div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default CategoryTabs;
