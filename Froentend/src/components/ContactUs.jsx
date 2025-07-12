import { Clock, Headphones, Mail, MapPin, MessageCircle, Phone, Send, Users } from 'lucide-react';
import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 overflow-hidden">
      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-violet-200">
              <MessageCircle className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">Get In Touch</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Contact
                <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Our Team
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Have questions about our products or need help with your order? We're here to help you make the most sustainable choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900">
                  Let's
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Connect</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you have questions about our products, need support, or want to learn more about sustainable living, we're here to help.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">support@sustainableshop.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">123 Eco Street, Green City, GC 12345</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-5 h-5 text-violet-600" />
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-violet-200/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="order-support">Order Support</option>
                    <option value="general-question">General Question</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              More Ways to
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Get Help</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the support option that works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 transform hover:scale-105 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Get instant help from our support team</p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200">
                Start Chat
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 transform hover:scale-105 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Forum</h3>
              <p className="text-sm text-gray-600 mb-4">Connect with other eco-conscious shoppers</p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200">
                Join Forum
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 transform hover:scale-105 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">Detailed help via email within 24 hours</p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-medium hover:from-violet-600 hover:to-purple-600 transition-all duration-200">
                Send Email
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Frequently Asked
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50">
              <h3 className="font-semibold text-gray-900 mb-2">How do you ensure products are truly sustainable?</h3>
              <p className="text-gray-600">We have a rigorous vetting process that includes third-party certifications, supply chain audits, and environmental impact assessments for every product.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50">
              <h3 className="font-semibold text-gray-900 mb-2">What's your return policy?</h3>
              <p className="text-gray-600">We offer a 30-day return policy for all products. Items must be in original condition and packaging.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50">
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer international shipping?</h3>
              <p className="text-gray-600">Yes, we ship to over 25 countries worldwide. Shipping costs and delivery times vary by location.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
