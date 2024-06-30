import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from "../api/api"
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/features/userReducer';

// Signup fields
const signupFields = [
  {
    labelText: "Username",
    labelFor: "username",
    id: "username",
    name: "username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeholder: "Username"
  },
  {
    labelText: "Email address",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address"
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password"
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm-password",
    id: "confirm-password",
    name: "confirm-password",
    type: "password",
    autoComplete: "confirm-password",
    isRequired: true,
    placeholder: "Confirm Password"
  }
];

// Input component
const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

const Input = ({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass
}) => {
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

const Signup = () => {
  const [signupState, setSignupState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignupState({ ...signupState, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { email, password, 'confirm-password': confirmPassword, username } = signupState;

      if (!email || !password || !confirmPassword || !username) {
        setError('All fields are required.');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }

      // Password regex validation
      const passwordPattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/;

      if (!passwordPattern.test(password)) {
        setError('Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character.');
        setLoading(false);
        return;
      }

      const signupResponse = await client.post(
        "api/signup/",
        {
          email,
          password,
          confirm_password: confirmPassword,
          name: username
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (signupResponse.status === 201) {
        const responseData = signupResponse.data;
        localStorage.setItem('accessToken', responseData.access);
        localStorage.setItem('refreshToken', responseData.refresh);

        const user_details = {
          "name": username,
          "email": email,
        }
        dispatch(setUserDetails(user_details));

        const userDetailsJSON = JSON.stringify(user_details);
        const userTokenPayload = btoa(userDetailsJSON);
        localStorage.setItem('userDetails', userTokenPayload);

        // Use navigate to redirect to /homepage
        navigate('/');
      } else {
        const responseData = await signupResponse.json();
        setError('Error during signup: ' + responseData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Error during signup: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <div className="">
        {signupFields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id] || ''}
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
        disabled={loading}
        className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6959CF] hover:bg-[#4935cb]"
      >
        {loading ? 'Signing up...' : 'Signup'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default Signup;
