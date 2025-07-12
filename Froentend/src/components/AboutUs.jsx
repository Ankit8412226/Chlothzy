import { Award, Globe, Heart, Leaf, Recycle, Star, Target, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 overflow-hidden">
      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-violet-200">
              <Heart className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">Our Story</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                About
                <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We're on a mission to make sustainable living accessible to everyone. Founded in 2020, we've grown into a trusted platform for eco-conscious consumers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900">
                  Our
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Vision</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We envision a world where sustainable choices are the norm, not the exception. Every product we curate is carefully selected to ensure it meets our strict environmental and quality standards.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">100% Eco-Friendly</h3>
                    <p className="text-sm text-gray-600">Every product is sustainably sourced</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Global Impact</h3>
                    <p className="text-sm text-gray-600">Making a difference worldwide</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Quality First</h3>
                    <p className="text-sm text-gray-600">Premium products that last</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Floating Cards */}
              <div className="absolute -top-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/50 animate-float">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">5 Years</div>
                    <div className="text-sm text-gray-600">Of Excellence</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/50 animate-float animation-delay-2000">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Recycle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">1M+ Tons</div>
                    <div className="text-sm text-gray-600">CO2 Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Our
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from product selection to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-sm text-gray-600">Every decision we make considers environmental impact first.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-sm text-gray-600">Building a global community of conscious consumers.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-sm text-gray-600">Premium products that exceed expectations and last longer.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-sm text-gray-600">Transparent practices and honest communication always.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">1000+</div>
              <div className="text-sm text-gray-600 font-medium">Eco Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">50k+</div>
              <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">25+</div>
              <div className="text-sm text-gray-600 font-medium">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-sm text-gray-600 font-medium">Sustainable</div>
            </div>
          </div>
        </div>
      </section>

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
      `}</style>
    </div>
  );
};

export default AboutUs;
