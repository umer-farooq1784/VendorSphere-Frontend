import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../static/assets/profileIcon.svg';
import ContactIcon from '../static/assets/contactIcon.svg';
import AnalyticsIcon from '../static/assets/analyticsIcon.svg';
import StoreIcon from '../static/assets/StoreIcon.svg';
import Logo from '../static/assets/VendorSphere.svg';
import MenuIcon from '../static/assets/MenuIcon.svg';
import LogoutIcon from '../static/assets/logoutIcon.svg';

const Header = () => {
  let navigate = useNavigate();

  function handleStore(e) {
    e.preventDefault();
    // Add your handleStore logic here
  }

  function handleHome(e) {
    e.preventDefault();
    navigate('/home');
  }

  return (
    <div>
      <div className="ml-5 mr-5 md:mr-8 md:ml-8 pt-3 md:pt-4 flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <button className="block mr-1 md:hidden">
            <img src={MenuIcon} alt="Menu" />
          </button>
          <div className="flex h-6 md:h-10 md:w-full" onClick={handleHome}>
            <img src={Logo} alt="VendorSphere Logo" />
          </div>
        </div>
        <div className="hidden md:flex w-full justify-between h-3/4 ml-10 mr-10 border-2 rounded-md border-[#6959CF] ">
          <input className="pl-2 pr-2 w-5/6" type="text" placeholder="Search..." />
          <button className="font-inter hidden md:block text-white text-base bg-[#6959CF] w-1/6" type="button">
            Search
          </button>
        </div>
        <div className="flex justify-between">
          <button className="flex flex-col items-center pl-3 md:pl-2">
            <img className="w-4 h-4 md:w-5 md:h-5 " src={ProfileIcon} alt="Profile" />
            <p className="text-[#8B96A5] text-xs hidden md:block">Profile</p>
          </button>
          {/* Other buttons */}
          <button className="flex flex-col items-center pl-3 md:pl-2 truncate">
            <img className="w-4 h-4 md:w-5 md:h-5 " src={LogoutIcon} alt="Logout" />
            <p className="text-[#8B96A5] text-xs hidden md:block">Logout</p>
          </button>
        </div>
      </div>
      <div className="flex flex-row md:hidden justify-between h-3/4 ml-5 mt-2 mr-5 border-2 rounded-md border-[#6959CF] ">
        <input className="pl-2 pr-2 w-5/6" type="text" placeholder="Search..." />
        <button className="font-inter text-sm text-white bg-[#6959CF] w-1/6" type="button">
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
