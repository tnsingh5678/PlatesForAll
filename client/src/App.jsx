import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonationOption from './pages/DonationOption';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext';
import { AcceptedRequestProvider } from './context/AcceptedRequestContext';
import HomePage from './components/Home';
import Header from './layout/Header';
import Footer from './layout/Footer';
import About from './navBarLink/Aboutus';
import Chatbot from './components/ChatBot';
import Contact from './pages/Contact';
import Programs from './pages/Program';
import ProtectedRoute from './components/Protected';
import UserRequests from './VolunteeringRequest';
import PickDonation from './pick';
import Map from './components/Map';
import { LocationProvider } from './context/LocationContext';
import PathFinderMap from './components/PickComponent';
import PathFinderMapDrop from './components/DropComponent';
import DropDonation from './DropDonation';
import DonationPointsPage from './pages/DonationPoints';
import DonationWithLocation from './pages/DonationWithLocation';
import VolunteerLocationsPage from './pages/VolunteerLocationPage';
import { VolunteerProvider } from './context/VolunteerContext';
import GetInvolved from './navBarLink/GetInvolved';
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <LocationProvider>
          <AcceptedRequestProvider>
            <VolunteerProvider>
          <ToastContainer />
          <Header />
          <Routes>
            {/* Protect all routes that should require authentication */}
            <Route path="/" element={<ProtectedRoute element={HomePage} />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/donation" element={<ProtectedRoute element={DonationOption} />} />
            <Route path="/about" element={<ProtectedRoute element={About} />} />
          
            <Route path="/programs" element={<ProtectedRoute element={Programs} />} />
            <Route path="/contact" element={<ProtectedRoute element={Contact} />} />
           
            <Route path="/requests" element={<ProtectedRoute element={UserRequests}/>}/>
            <Route path="/pick" element={<ProtectedRoute element={PickDonation}/>}/>
            <Route path="/map" element={<ProtectedRoute element={Map}/>}/>
            <Route path="/mapc" element={<ProtectedRoute element={PathFinderMap}/>}/>
            <Route path="/mapd" element={<ProtectedRoute element={PathFinderMapDrop}/>}/>
            <Route path="/drop" element={<ProtectedRoute element={DropDonation}/>}/>
            <Route path="/donate" element={<ProtectedRoute element={DonationWithLocation}/>}/>
            <Route path="/volunteer" element={<ProtectedRoute element={VolunteerLocationsPage}/>}/>
            <Route path="/getinvolved" element={<ProtectedRoute element={GetInvolved}/>}/>
          </Routes>
          <Chatbot />
          <Footer />
          </VolunteerProvider>
          </AcceptedRequestProvider>
          </LocationProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
