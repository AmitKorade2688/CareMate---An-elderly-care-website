import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assests } from '../constants';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for the mobile menu

const Navbar = () => {
  const [currentLocation, setCurrentLocation] = useState('Detecting location...');
  const [isLocationFetching, setIsLocationFetching] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationFromCoordinates(latitude, longitude);
        },
        () => {
          setIsLocationFetching(false);
          setCurrentLocation('Location access denied');
        }
      );
    } else {
      setIsLocationFetching(false);
      setCurrentLocation('Geolocation not supported');
    }

    const timer = setTimeout(() => {
      setIsNavbarVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const fetchLocationFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      if (data && data.city) {
        setCurrentLocation(data.city);
      } else {
        setCurrentLocation('Location not found');
      }
    } catch (error) {
      setCurrentLocation('Error fetching location');
    }
    setIsLocationFetching(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const navbarStyle = {
    backgroundColor: 'white',
    color: 'black',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 50,
  };

  const linkStyle = {
    position: 'relative',
    cursor: 'pointer',
  };

  const hoverStyle = {
    position: 'absolute',
    left: 0,
    bottom: '-2px',
    height: '2px',
    backgroundColor: 'orange',
    transition: 'width 0.3s ease-in-out',
  };

  return (
    <div>
      <nav
        className={`py-4 border-b transition-all duration-1000 ease-in-out transform ${isNavbarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        style={navbarStyle}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <img className="h-10 w-auto mr-2 object-contain" src={assests.logo} alt="Logo" />
            <span className="font-bold text-2xl tracking-wide">CareMate</span>
          </div>

          {/* Desktop Navigation */}
          <ul className={`hidden lg:flex space-x-8`}>
            {['Home', 'Services', 'Join Us', 'About Us', 'Contact US', 'Blog'].map((item, index) => (
              <li key={index} className="relative group" style={linkStyle}>
                <Link to={item === 'Home' ? '/' : item === 'Join Us' ? '/careers' : `/${item.replace(' ', '-').toLowerCase()}`}>
                  <span className="text-black text-lg"> {/* Increased font size here */}
                    {item}
                  </span>
                </Link>
                <div
                  className="absolute left-0 bottom-0 h-1 bg-orange-600 w-0 group-hover:w-full"
                  style={hoverStyle}
                ></div>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4"> {/* Adjusted space */}
            <div className="text-lg">{isLocationFetching ? 'Fetching location...' : currentLocation}</div> {/* Increased font size here */}
            <button 
              className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg transition duration-300 ease-in-out transform hover:bg-teal-600 hover:scale-105 delay-100 text-lg" // Increased padding and font size
              onClick={() => navigate('/getappointment')}
            >
              Book Appointment
            </button>
            {/* Mobile Menu Icon */}
            <button onClick={toggleMobileMenu} className="lg:hidden text-black focus:outline-none">
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <ul className="absolute top-full right-0 w-full bg-white shadow-lg flex flex-col lg:hidden">
              {['Home', 'About Us', 'Services', 'Contact Us', 'Blog', 'Join Us'].map((item, index) => (
                <li key={index} className="py-3 text-center"> {/* Increased padding */}
                  <Link to={item === 'Home' ? '/' : item === 'Join Us' ? '/careers' : `/${item.replace(' ', '-').toLowerCase()}`} onClick={toggleMobileMenu}>
                    <span className="text-black text-lg">{item}</span> {/* Increased font size */}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
