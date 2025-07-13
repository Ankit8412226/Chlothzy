import { Home, Info, Menu, MessageCircle, Package, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';

const Header = ({ cart = [], isLoggedIn = false, user = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: MessageCircle }
  ];

  const handleAuthRedirect = (type) => {
    window.location.href = `/auth?mode=${type}`;
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                EcoMart
              </h1>
              <p className="text-sm text-gray-500 -mt-1">Premium Store</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative px-6 py-3 text-gray-700 hover:text-violet-600 transition-all duration-200 rounded-lg hover:bg-violet-50"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-base">{item.name}</span>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            {/* Search Button (Desktop) */}
            <button className="hidden md:flex items-center space-x-3 px-6 py-3 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-base">Search</span>
            </button>

            {/* Auth Section */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-violet-600 transition-colors rounded-lg hover:bg-violet-50"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block font-medium text-base">
                    {user?.name || 'User'}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <a
                      href="/profile"
                      className="block px-4 py-3 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                    >
                      Profile
                    </a>
                    <a
                      href="/orders"
                      className="block px-4 py-3 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                    >
                      Orders
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-3 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                    >
                      Settings
                    </a>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleAuthRedirect('login')}
                className="hidden md:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Cart */}
            <a
              href="/cart"
              className="relative p-3 text-gray-700 hover:text-violet-600 transition-colors group"
            >
              <div className="relative">
                <ShoppingCart className="w-7 h-7" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-gray-700 hover:text-violet-600 transition-colors rounded-lg hover:bg-violet-50"
            >
              {isMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-6 py-6 space-y-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
              {/* Mobile Search */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 px-4 py-4 text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 bg-transparent outline-none text-base placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Mobile Auth Section */}
              {!isLoggedIn && (
                <div className="mb-6">
                  <button
                    onClick={() => handleAuthRedirect('login')}
                    className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-md font-medium"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-base">Sign In</span>
                  </button>
                </div>
              )}

              {/* Mobile User Menu */}
              {isLoggedIn && (
                <div className="mb-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 text-base">
                        {user?.name || 'User'}
                      </span>
                      <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a
                      href="/profile"
                      className="block px-3 py-2 text-gray-700 hover:text-violet-600 hover:bg-white rounded-lg transition-colors"
                    >
                      Profile
                    </a>
                    <a
                      href="/orders"
                      className="block px-3 py-2 text-gray-700 hover:text-violet-600 hover:bg-white rounded-lg transition-colors"
                    >
                      Orders
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center justify-between px-4 py-4 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-200 border border-transparent hover:border-violet-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 group-hover:bg-violet-100 rounded-lg flex items-center justify-center transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-base">{item.name}</span>
                    </div>
                    <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Mobile Cart Summary */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 text-base">Shopping Cart</span>
                      <p className="text-sm text-gray-600">{cartItemCount} items</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
