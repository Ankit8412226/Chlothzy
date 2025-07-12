import { Facebook, Heart, Instagram, Mail, MapPin, Phone, Sparkles, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-3">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hexagon-footer" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,1 18,6 18,14 10,19 2,14 2,6" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon-footer)" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  EcoMart
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your trusted partner for sustainable living. We offer eco-friendly products
                that help you make a positive impact on the environment while enjoying
                quality and style.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="group w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl border border-violet-200"
                >
                  <Facebook className="w-5 h-5 text-violet-600 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="group w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl border border-violet-200"
                >
                  <Twitter className="w-5 h-5 text-violet-600 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="group w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl border border-violet-200"
                >
                  <Instagram className="w-5 h-5 text-violet-600 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Customer Service
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">123 Green Street</p>
                    <p className="text-gray-600">Eco City, EC 12345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-600 font-medium">+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-600 font-medium">support@ecomart.com</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-violet-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-violet-600">Business Hours:</span><br />
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-violet-200/50 bg-white/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-600">
                <p>&copy; 2024 EcoMart. All rights reserved.</p>
                <span>|</span>
                <p className="flex items-center space-x-1">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                  <span>for the planet</span>
                  <Sparkles className="w-4 h-4 text-violet-500" />
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                  Privacy
                </a>
                <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                  Terms
                </a>
                <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors duration-200 font-medium">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
