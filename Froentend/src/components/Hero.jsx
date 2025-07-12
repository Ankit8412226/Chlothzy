import { ArrowRight, Award, Play, ShoppingBag, Sparkles, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 py-24 lg:py-32 overflow-hidden">




      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-violet-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">Premium Eco-Friendly Store</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Shop
                <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Sustainably
                </span>
                <span className="block text-5xl lg:text-6xl">Live Better</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Discover premium eco-friendly products that make a real difference. From cutting-edge electronics to sustainable fashion, we curate the best for conscious consumers.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
                <div className="relative z-10 flex items-center justify-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group flex items-center justify-center space-x-2 px-8 py-4 border-2 border-violet-300 text-violet-600 rounded-2xl font-semibold hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all duration-300">
                <Play className="w-5 h-5" />
                <span>Watch Story</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="text-center group">
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">1000+</div>
                <div className="text-sm text-gray-600 font-medium">Eco Products</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">50k+</div>
                <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">100%</div>
                <div className="text-sm text-gray-600 font-medium">Sustainable</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Visual */}
          <div className="relative">



            {/* Floating Feature Cards */}
            <div className="absolute -top-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 animate-float">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">100% Eco-Friendly</div>
                  <div className="text-sm text-gray-600">Certified sustainable</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 animate-float animation-delay-2000">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Free Shipping</div>
                  <div className="text-sm text-gray-600">Orders above $50</div>
                </div>
              </div>
            </div>

            {/* Additional floating element */}
            <div className="absolute top-16 -right-4 w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg animate-bounce animation-delay-1000">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-24 pt-12 border-t border-violet-200">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 font-medium">TRUSTED BY LEADING BRANDS</p>
          </div>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400">EcoTech</div>
            <div className="text-2xl font-bold text-gray-400">GreenLife</div>
            <div className="text-2xl font-bold text-gray-400">SustainCorp</div>
            <div className="text-2xl font-bold text-gray-400">EarthFirst</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

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

export default Hero;
