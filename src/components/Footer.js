import React from 'react'
import MySVG from '../static/assets/VendorSphere.svg'
import Fb from '../static/assets/fbIcon.svg'
import Insta from '../static/assets/instaIcon.svg'
import LinkdIn from '../static/assets/linkdInIcon.svg'
import Twitter from '../static/assets/twitterICon.svg'

const Footer = () => (
  <footer>
    <div className="flex flex-col  items-center">
      <div className="flex flex-col ml-5 mr-5 md:ml-0 md:mr-0 items-center pt-4">
        <p className="font-semibold text-base md:text-xl">Subscribe to out news letter</p>
        <p className="font-light text-[#606060] text-xs md:text-base">
          {' '}
          Get daily news on upcoming offers from many suppliers all over the world
        </p>
        <div className="flex w-full justify-between mt-5 mb-10 border-2 rounded-md border-solid border-[#6959CF] ">
          <input className="pl-2 pr-2 w-full" type="text" placeholder="Email..." />
          <button className="font-inter text-white pl-2 pr-2 bg-[#6959CF]" type="button">
            Subscribe
          </button>
        </div>
      </div>

      <div className="bg-white mr-0 ml-0 pr-0 pl-0 pt-3 md:pt-5 pb-3 md:pb-5 w-full flex flex-col md:flex-row justify-around items-center mb-4 ">
        <div className="flex ">
          <img src={MySVG} alt="Logo" />
        </div>

        <p className="text-gray-400 text-xs md:text-sm mt-2 md:mt-0">
          &copy; 2023 VendorSphere. All rights reserved.
        </p>
        <div className="flex justify-between h-6 md:h-8 mt-1 md:mt-0">
          <img src={Fb} alt="Fb" />
          <img src={Twitter} alt="twitter" />
          <img src={Insta} alt="insta" />
          <img src={LinkdIn} alt="linkdin" />
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
