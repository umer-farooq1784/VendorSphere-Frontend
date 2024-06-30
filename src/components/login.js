import React from 'react';
import { Link } from 'react-router-dom';

import LoginC from './LoginComplete';
import Background from '../static/assets/login.jpg';
import Logo from '../static/assets/logo.svg';


export default function Login() {
  return (
    <div className='bg-gray-200 w-full h-screen items-center flex justify-center'>

      <section className='flex flex-col w-[70%] h-[80%]  md:flex-row'>
        {/* Left column container with background */}
        <div className="hidden rounded-s-lg md:flex md:flex-1 overflow-hidden">

          <img
            src={Background}
            alt="Sample image"
            style={{ opacity: 0.7 }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right column container */}
        <div className="rounded-r-lg md:flex-1 p-8 flex flex-col justify-center items-center bg-white">
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-center">

              <Link to={'/home'}>
                <img
                  alt=""
                  className="h-90 w-90"
                  src={Logo}
                />
              </Link>

            </div>
            <h2 className="mt-3 text-left text-2xl font-inter font-bold text-gray-900">
              Login
            </h2>


            <LoginC />
            <p className="mt-2 text-center text-sm text-gray-600"> {/* Remove the top margin */}
              Don't have an account yet?
              <Link to={'/signup'} className="font-medium text-[#6959CF]">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </section>


    </div>

  );
}
