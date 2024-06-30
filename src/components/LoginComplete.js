import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../api/api'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../redux/features/userReducer'

const loginFields = [
  {
    labelText: 'Email address',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
]

// Input
const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm'

function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
}) {
  return (
    <div className="my-3">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
      />
    </div>
  )
}

export default function Login() {
  const dispatch = useDispatch()

  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  let navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setLoginState({ ...loginState, [id]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await client.post('api/login/', {
        email: loginState.email,
        password: loginState.password,
      })

      if (response.data.access && response.data.refresh) {
        const userDetailsJSON = JSON.stringify(response.data.user)
        const userTokenPayload = btoa(userDetailsJSON)
        // Set token in local storage
        localStorage.setItem('accessToken', response.data.access)
        localStorage.setItem('refreshToken', response.data.refresh)
        localStorage.setItem('userDetails', userTokenPayload)

        dispatch(setUserDetails(response.data.user))

        navigate('/')
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      console.error('Error during login:', error)
      setError('Invalid email or password')
    }
  }

  return (
    <div>
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="">
          {loginFields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        <button
          type="submit"
          className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6959CF] hover:bg-[#4935cb]"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
