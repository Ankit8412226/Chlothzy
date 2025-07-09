import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Sample Pages
const Home = () => <h2 className="text-2xl">Welcome to the Home Page</h2>;
const About = () => <h2 className="text-2xl">About Us</h2>;
const Contact = () => <h2 className="text-2xl">Contact Page</h2>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        {/* Navigation */}
        <nav className="bg-white shadow-md p-4 mb-6 rounded-md flex gap-4">
          <Link className="text-blue-600 hover:underline" to="/">Home</Link>
          <Link className="text-blue-600 hover:underline" to="/about">About</Link>
          <Link className="text-blue-600 hover:underline" to="/contact">Contact</Link>
        </nav>

        {/* Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
