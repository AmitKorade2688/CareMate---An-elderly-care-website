import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { assests } from '../constants';

const Footer = () => {
  return (
    <div className="footer py-16 px-8 bg-gray-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Footer Left Section */}
        <div className="footer-content-left space-y-6">
          <img src={assests.logo} alt="logo" className="w-32 hover:scale-105 transition-transform duration-30" />
          <p className="text-md leading-6">
            At CareMate, we believe in providing quality care and companionship for the elderly. Our services ensure that seniors receive the respect, support, and attention they deserve, whether it’s through home visits, medical assistance, or just lending a compassionate ear.
          </p>
          
          {/* Social Icons */}
          <div className="footer-social-icons flex space-x-4">
            <img src={assests.facebook_icon} alt="Facebook" className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-300" />
            <img src={assests.twitter_icon} alt="Twitter" className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-300" />
            <img src={assests.linkedin_icon} alt="LinkedIn" className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Footer Center Section - Company Links */}
        <div className="footer-content-center">
          <h2 className="text-xl font-bold mb-4">COMPANY</h2>
          <ul className="space-y-2 font-semibold">
            <li className="hover:text-sky-400 cursor-pointer transition-colors duration-300">
              <Link to="/">Home</Link> {/* Link to Home */}
            </li>
            <li className="hover:text-sky-400 cursor-pointer transition-colors duration-300">
              <Link to="/about-us">About Us</Link> {/* Link to About Us */}
            </li>
            <li className="hover:text-sky-400 cursor-pointer transition-colors duration-300">
              <Link to="/services">Services</Link> {/* Update as needed */}
            </li>
            <li className="hover:text-sky-400 cursor-pointer transition-colors duration-300">
              <Link to="/blog">Blog</Link> {/* Update as needed */}
            </li>
          </ul>
        </div>

        {/* Footer Right Section - Get In Touch */}
        <div className="footer-content-right">
          <h2 className="text-xl font-bold mb-4">GET IN TOUCH</h2>
          <ul className="space-y-2">
            <li className="text-md font-semibold">+91 9967351242</li>
            <li className="text-md font-semibold">contact@caremate.com</li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-gray-600" />
      <div className="text-center">
        <p className="text-md font-semibold">&copy; 2024 CareMate.com - All Rights Reserved.</p>
        <p className="text-md font-semibold mt-2">Made with ❤️ by Byte Battalion</p> {/* Added line here */}
      </div>
    </div>
  );
};

export default Footer;
