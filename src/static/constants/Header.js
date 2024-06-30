import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HiOutlineSearch } from 'react-icons/hi'
import { IoIosPerson } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import Logo from '../assets/VendorSphere.svg'
import { useSelector } from 'react-redux'
import SearchBar from '../../components/SearchBar'
import client from '../../api/api'

export default function Header() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const localImage = user.image
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    let searchTerm = e.target.value
    setSearchTerm(searchTerm)
    if (searchTerm.trim() !== '') {
      navigate(`/search/${searchTerm}`)
    } else {
      navigate(`/`)
    }
  }

  const handleLogout = () => {
    // Perform logout action here
    client
      .post('api/logout/', {
        refresh: localStorage.getItem('refreshToken'),
      })
      .then(() => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userDetails')
        window.location.href = '/login' // Redirect to login page
      })
      .catch((error) => {
        console.error('Error logging out:', error)
        // Handle error if needed
      })
  }

  /*const openSearchPage = (e) => {
    navigate('/search')
  }*/
  const openHomePage = (e) => {
    navigate('/')
  }

  return (
    <div className="bg-white h-16 px-4 flex-col flex md:flex-row items-center border-b border-gray-200 justify-between">
      <div className="flex mt-2 md:mt-0 hover:cursor-pointer" onClick={openHomePage}>
        <img src={Logo} alt="VendorSphere Logo" />
      </div>
      <div className="flex">
        {/* <SearchBar /> */}
        <div className="relative rounded-lg">
          <HiOutlineSearch
            fontSize={20}
            className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            className="text-sm focus:outline-none active:outline-none border border-gray-300 w-full sm:w-[44rem] h-10 pl-11 pr-4 rounded-sm"
          />
        </div>
        <div className="flex items-center gap-2 mr-2">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                <span className="sr-only">Open user menu</span>
                <div
                  className="h-10 w-10 rounded-full bg-gray-100 bg-cover bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${localImage})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                ></div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate('/profile')}
                      className={classNames(
                        active && 'bg-gray-100',
                        'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
                      )}
                    >
                      Your Profile
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={handleLogout}
                      className={classNames(
                        active && 'bg-gray-100',
                        'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
                      )}
                    >
                      Sign out
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}
