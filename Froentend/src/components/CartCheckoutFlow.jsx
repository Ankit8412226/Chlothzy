import {
  ArrowRight,
  Award,
  Check,
  CreditCard,
  Heart,
  Leaf,
  MapPin,
  Minus,
  Package,
  Plus,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Trash2,
  Truck,
  Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartCheckoutFlow = ({
  cart = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  cartTotal = 0
}) => {
  const [currentStep, setCurrentStep] = useState('cart');
  const [user, setUser] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      // Pre-fill shipping address if available
      if (userData.address) {
        setShippingAddress({
          fullName: userData.name || '',
          address: userData.address.street || '',
          city: userData.address.city || '',
          state: userData.address.state || '',
          zipCode: userData.address.zipCode || '',
          country: userData.address.country || ''
        });
      }
    }
  }, []);

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getEcoImpact = () => {
    const totalItems = getTotalItems();
    const treesPlanted = Math.floor(totalItems * 0.5);
    const carbonOffset = (totalItems * 2.3).toFixed(1);
    return { treesPlanted, carbonOffset };
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['fullName', 'address', 'city', 'state', 'zipCode', 'country'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field]);

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to complete your order');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Validate payment details
    if (paymentMethod === 'card') {
      const requiredFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
      const missingFields = requiredFields.filter(field => !cardDetails[field]);

      if (missingFields.length > 0) {
        toast.error('Please fill in all card details');
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderNum = 'ECO-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderNumber(orderNum);

      // Clear cart after successful order
      if (onClearCart) {
        onClearCart();
      }

      toast.success('Order placed successfully!');
      setCurrentStep('confirmation');
    } catch (error) {
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const CartPage = () => (
    <div className="space-y-8">
      {/* Header with Animated Background */}
      <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-violet-100">Sustainable choices for a better tomorrow</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{getTotalItems()}</div>
            <div className="text-sm text-violet-100">eco-friendly items</div>
          </div>
        </div>
      </div>

      {/* Eco Impact Card */}
      {cart.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-200/50">
          <div className="flex items-center space-x-2 mb-4">
            <Leaf className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Your Eco Impact</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getEcoImpact().treesPlanted}</div>
              <div className="text-sm text-gray-600">Trees Planted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{getEcoImpact().carbonOffset} kg</div>
              <div className="text-sm text-gray-600">CO₂ Offset</div>
            </div>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-violet-200 to-purple-200 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-violet-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-bounce">
              <Leaf className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your eco-cart is empty</h2>
          <p className="text-gray-600 text-lg">Start your sustainable journey today!</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map(item => (
              <div key={item._id} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-200/50 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="relative">
                    <img
                      src={item.image || item.images?.[0] || '/placeholder-image.jpg'}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <Heart className="w-5 h-5 text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating || 4.5)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          {item.rating || 4.5} ({item.reviews || 0} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-violet-100 text-violet-700">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Eco-Friendly</span>
                      </div>
                    </div>

                    <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between space-y-4">
                    <button
                      onClick={() => onRemoveItem(item._id)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors group-hover:scale-110"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center space-x-3 bg-gray-50 rounded-full p-2">
                      <button
                        onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                        className="p-2 bg-white hover:bg-gray-100 rounded-full transition-colors shadow-sm"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                        className="p-2 bg-white hover:bg-gray-100 rounded-full transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-violet-200/50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-gray-900">Order Total</span>
              <span className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold text-green-800">Free Shipping</div>
                  <div className="text-sm text-green-600">Carbon-neutral delivery</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold text-blue-800">Eco Guarantee</div>
                  <div className="text-sm text-blue-600">100% sustainable</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-semibold text-purple-800">Community Impact</div>
                  <div className="text-sm text-purple-600">Supporting local farmers</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => user ? setCurrentStep('address') : toast.error('Please login to checkout')}
              disabled={cart.length === 0}
              className="group relative w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <span className="text-lg">Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </>
      )}
    </div>
  );

  const AddressPage = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCurrentStep('cart')}
          className="p-3 hover:bg-violet-100 rounded-full transition-colors"
        >
          <ArrowRight className="w-6 h-6 rotate-180 text-violet-600" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Shipping Address</h1>
          <p className="text-gray-600">Where should we deliver your eco-friendly products?</p>
        </div>
      </div>

      <form onSubmit={handleAddressSubmit} className="space-y-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-violet-200/50">
          <div className="flex items-center space-x-2 mb-6">
            <MapPin className="w-6 h-6 text-violet-600" />
            <h3 className="text-xl font-semibold text-gray-900">Delivery Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={shippingAddress.fullName}
                onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                className="w-full px-4 py-4 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all bg-white/50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
              <input
                type="text"
                required
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                className="w-full px-4 py-4 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all bg-white/50"
                placeholder="123 Main Street"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
              <input
                type="text"
                required
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                className="w-full px-4 py-4 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all bg-white/50"
                placeholder="New York"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
              <input
                type="text"
                required
                value={shippingAddress.state}
                onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                className="w-full px-4 py-4 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all bg-white/50"
                placeholder="NY"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code *</label>
              <input
                type="text"
                required
                value={shippingAddress.zipCode}
                onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                className="w-full px-4 py-4 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all bg-white/50"
                placeholder="10001"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
              <select
                required
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                className="w-full px-4 py-4 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all bg-white/50"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="group relative w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
        >
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Continue to Payment</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>
    </div>
  );

  const PaymentPage = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCurrentStep('address')}
          className="p-3 hover:bg-violet-100 rounded-full transition-colors"
        >
          <ArrowRight className="w-6 h-6 rotate-180 text-violet-600" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Payment</h1>
          <p className="text-gray-600">Secure payment for your sustainable purchase</p>
        </div>
      </div>

      <form onSubmit={handlePaymentSubmit} className="space-y-6">
        {/* Payment Method */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-violet-200/50">
          <div className="flex items-center space-x-2 mb-6">
            <CreditCard className="w-6 h-6 text-violet-600" />
            <h3 className="text-xl font-semibold text-gray-900">Payment Method</h3>
          </div>

          <div className="space-y-4 mb-6">
            <label className="flex items-center space-x-4 cursor-pointer p-4 rounded-xl border-2 border-violet-200 hover:border-violet-300 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 text-violet-600"
              />
              <CreditCard className="w-6 h-6 text-violet-600" />
              <span className="font-semibold">Credit/Debit Card</span>
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name *</label>
                <input
                  type="text"
                  required
                  value={cardDetails.cardholderName}
                  onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                  className="w-full px-4 py-4 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all bg-white/50"
                  placeholder="John Doe"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number *</label>
                <input
                  type="text"
                  required
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                  className="w-full px-4 py-4 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all bg-white/50"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date *</label>
                <input
                  type="text"
                  required
                  value={cardDetails.expiryDate}
                  onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                  className="w-full px-4 py-4 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all bg-white/50"
                  placeholder="MM/YY"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CVV *</label>
                <input
                  type="text"
                  required
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                  className="w-full px-4 py-4 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all bg-white/50"
                  placeholder="123"
                />
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-violet-200/50">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">${(cartTotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                ${(cartTotal * 1.08).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="group relative w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <Shield className="w-5 h-5" />
            <span className="text-lg">
              {isProcessing ? 'Processing...' : 'Complete Secure Payment'}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>
    </div>
  );



  const ConfirmationPage = () => (
    <div className="space-y-8 text-center">
      <div className="relative">
        <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border border-violet-200">
          <Check className="w-12 h-12 text-green-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-bounce">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-6">
          Thank you for your purchase! Your order has been successfully placed.
        </p>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-200/50 max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Package className="w-6 h-6 text-violet-600" />
            <span className="text-lg font-semibold">Order Number</span>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            {orderNumber}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-gray-600">
            We'll send you a confirmation email with tracking information once your order ships.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setCurrentStep('cart');
                setCartItems([]);
              }}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-8 mb-12">
          {[
            { key: 'cart', label: 'Cart', icon: ShoppingCart },
            { key: 'address', label: 'Address', icon: MapPin },
            { key: 'payment', label: 'Payment', icon: CreditCard },
            { key: 'confirmation', label: 'Confirmation', icon: Check }
          ].map(({ key, label, icon: Icon }, index) => (
            <div key={key} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                currentStep === key
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white border-violet-600'
                  : ['cart', 'address', 'payment', 'confirmation'].indexOf(currentStep) > index
                  ? 'bg-green-500 text-white border-green-500'
                  : 'border-gray-300 text-gray-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep === key ? 'text-violet-600' : 'text-gray-500'
              }`}>
                {label}
              </span>
              {index < 3 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  ['cart', 'address', 'payment', 'confirmation'].indexOf(currentStep) > index
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Page Content */}
        {currentStep === 'cart' && <CartPage />}
        {currentStep === 'address' && <AddressPage />}
        {currentStep === 'payment' && <PaymentPage />}
        {currentStep === 'confirmation' && <ConfirmationPage />}
      </div>
    </div>
  );
};

export default CartCheckoutFlow;
