import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonationOption from './pages/DonationOption';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext';
import HomePage from './components/Home';
import Header from './layout/Header';
import Footer from './layout/Footer';
import About from './navBarLink/Aboutus';
import DonateFood from './navBarLink/DonateFood';
import Chatbot from './components/ChatBot';
import Contact from './pages/Contact';
import Programs from './pages/Program';
import ProtectedRoute from './components/Protected';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <ToastContainer />
          <Header />
          <Routes>
            {/* Protect all routes that should require authentication */}
            <Route path="/" element={<ProtectedRoute element={HomePage} />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/donation" element={<ProtectedRoute element={DonationOption} />} />
            <Route path="/about" element={<ProtectedRoute element={About} />} />
            <Route path="/donate" element={<ProtectedRoute element={DonateFood} />} />
            <Route path="/programs" element={<ProtectedRoute element={Programs} />} />
            <Route path="/contact" element={<ProtectedRoute element={Contact} />} />
          </Routes>
          <Chatbot />
          <Footer />
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
