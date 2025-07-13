import { AtSign, Eye, EyeOff, Heart, Lock, Mail, Phone, Shield, Sparkles, User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    rememberMe: false,
    agreeTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const { email, password } = formData;
        if (!email || !password) {
          toast.error('Please fill in all fields');
          return;
        }

        const { data } = await api.post('/auth/login', { email, password });

        localStorage.setItem('authToken', data.tokens.access.token);

        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Login successful!');
        navigate('/');
      } else {
        const { username, name, email, password, confirmPassword, mobile, agreeTerms } = formData;

        if (!username || !name || !email || !password || !confirmPassword || !mobile) {
          toast.error('Please fill in all fields');
          return;
        }


        if (username.length < 3) {
          toast.error('Username must be at least 3 characters long');
          return;
        }

        // Password validation (minimum 8 characters, must contain letter and number)
        if (password.length < 8) {
          toast.error('Password must be at least 8 characters long');
          return;
        }

        if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
          toast.error('Password must contain at least one letter and one number');
          return;
        }

        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }

        // Mobile validation (minimum 10 characters, numbers only)
        if (mobile.length < 10) {
          toast.error('Mobile number must be at least 10 digits');
          return;
        }

        if (!/^\d+$/.test(mobile)) {
          toast.error('Mobile number must contain only digits');
          return;
        }

        if (!agreeTerms) {
          toast.error('Please agree to the Terms & Conditions');
          return;
        }

        await api.post('/auth/register', { username, name, email, password, mobile });
        toast.success('Registration successful! Please login.');
        setIsLogin(true);
        setFormData({
          username: '',
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          mobile: '',
          rememberMe: false,
          agreeTerms: false,
        });
      }
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong';
      toast.error(message);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
          {/* Toggle Login/Signup */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold ${
                isLogin ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow' : 'text-gray-600 hover:text-violet-600'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold ${
                !isLogin ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow' : 'text-gray-600 hover:text-violet-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-violet-100 rounded-full px-4 py-2 border border-violet-200 shadow-sm mb-4">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">
                {isLogin ? 'Welcome Back!' : 'Join Our Community'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? 'Continue your sustainable shopping journey'
                : 'Start your eco-friendly shopping experience'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                      className="pl-10 pr-4 py-3 w-full border rounded-xl bg-white/80 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
                      required
                      minLength={3}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Minimum 3 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="pl-10 pr-4 py-3 w-full border rounded-xl bg-white/80 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter your mobile number"
                      className="pl-10 pr-4 py-3 w-full border rounded-xl bg-white/80 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
                      required
                      minLength={10}
                      pattern="[0-9]*"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Minimum 10 digits, numbers only</p>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="pl-10 pr-4 py-3 w-full border rounded-xl bg-white/80 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 py-3 w-full border rounded-xl bg-white/80 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters, must contain at least one letter and one number</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 py-3 w-full border rounded-xl bg-white/80 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={isLogin ? 'rememberMe' : 'agreeTerms'}
                checked={isLogin ? formData.rememberMe : formData.agreeTerms}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                required={!isLogin}
              />
              <label className="text-sm text-gray-600">
                {isLogin ? 'Remember me' : 'I agree to the Terms & Conditions'}
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={toggleMode}
                className="text-violet-600 font-medium hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4 text-green-500" />
            <span>Join our mission for a sustainable future</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
