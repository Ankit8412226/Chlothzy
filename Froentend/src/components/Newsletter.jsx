import { CheckCircle, Mail, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 overflow-hidden">



      {/* Floating Sparkles */}
      <div className="absolute top-20 left-1/4 animate-bounce animation-delay-1000">
        <Sparkles className="w-6 h-6 text-violet-400" />
      </div>
      <div className="absolute top-32 right-1/3 animate-bounce animation-delay-3000">
        <Sparkles className="w-4 h-4 text-purple-400" />
      </div>
      <div className="absolute bottom-20 left-1/3 animate-bounce animation-delay-2000">
        <Sparkles className="w-5 h-5 text-indigo-400" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {!isSubscribed ? (
            <>
              <div className="mb-10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border border-violet-200">
                    <Mail className="w-10 h-10 text-violet-600 animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center animate-bounce animation-delay-500">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Stay Updated with
                  <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    EcoMart
                  </span>
                </h2>

                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  Subscribe to our newsletter and be the first to know about new sustainable products,
                  exclusive offers, and eco-friendly tips that make a difference.
                </p>
              </div>

              <div className="max-w-lg mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300 shadow-lg backdrop-blur-sm border border-violet-200 bg-white/80"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-violet-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          <span>Subscribe</span>
                        </>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 text-gray-600 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border border-violet-200">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Thank You for
                <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Subscribing!
                </span>
              </h2>

              <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                You'll receive our latest updates and exclusive offers in your inbox.
                Welcome to the EcoMart family! 🌱
              </p>

              <div className="mt-8 flex justify-center space-x-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 border border-violet-200">
                    <Mail className="w-6 h-6 text-violet-600" />
                  </div>
                  <p className="text-gray-600 text-sm">Weekly Updates</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 border border-violet-200">
                    <Sparkles className="w-6 h-6 text-violet-600" />
                  </div>
                  <p className="text-gray-600 text-sm">Exclusive Offers</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Newsletter;
