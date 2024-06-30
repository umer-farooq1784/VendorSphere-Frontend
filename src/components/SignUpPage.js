import React from 'react'
import { Link } from 'react-router-dom'
import Signup from './Signup'
import Background from '../static/assets/login.jpg'
import Logo from '../static/assets/logo.svg'

export default function SignupPage() {
  return (
    <div className="bg-gray-200 w-full h-screen items-center flex justify-center">
      <section className="flex flex-col border border-solid rounded-lg w-[70%] h-[80%]  md:flex-row">
        <div className="rounded-s-lg hidden md:flex md:flex-1 overflow-hidden">
          <img
            src={Background}
            alt="Sample image"
            style={{ opacity: 0.7 }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="rounded-r-lg md:flex-1 p-8 flex flex-col justify-center bg-white">
          <div className="flex flex-col h-full justify-center">
            <div className="flex justify-center">
              <img alt="" className="h-90 w-90" src={Logo} />
            </div>
            <h2 className="mt-3 text-left text-2xl font-inter font-bold text-gray-900">Signup</h2>

            <div className="w-full">
              {/* Use max-width for responsiveness and a maximum width */}
              <Signup />
            </div>
            <p className="mt-2 text-center text-sm text-gray-600">
              {' '}
              {/* Remove the top margin */}
              Already have an account yet?
              <Link to={'/'} className="font-medium text-[#6959CF]">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}