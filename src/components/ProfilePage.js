import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import client from '../api/api';
import { setUserDetails } from '../redux/features/userReducer';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const [editableDetails, setEditableDetails] = useState({});
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    setEditableDetails({ ...userDetails });
  }, [userDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setEditableDetails((prevDetails) => ({
        ...prevDetails,
        [name]: '' + value,
      }));
    } else {
      setEditableDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditableDetails((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleDeleteAccount = () => {
    setShowConfirmationModal(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      const response = await client.delete('api/delete_account/', {
        data: {
          email: emailInput,
          password: passwordInput,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem('userDetails');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error deleting account:', error);
    } finally {
      setEmailInput('');
      setPasswordInput('');
      setShowConfirmationModal(false);
    }
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();

    formData.append('email', userDetails.email);

    for (const key in editableDetails) {
      if (editableDetails.hasOwnProperty(key) && editableDetails[key] !== userDetails[key]) {
        formData.append(key, editableDetails[key]);
      }
    }

    try {
      const response = await client.post('api/updateProfile/', formData);
      if (response.status === 200) {
        dispatch(setUserDetails(response.data.user));
        const userDetailsJSON = JSON.stringify(response.data.user);
        const userTokenPayload = btoa(userDetailsJSON);
        localStorage.removeItem('userDetails');
        localStorage.setItem('userDetails', userTokenPayload);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="w-full bg-white shadow-md rounded-lg p-8 mt-12">
        {showConfirmationModal && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white rounded-lg p-8 z-10">
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <input
                type="email"
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="border border-gray-300 rounded p-2 focus:border-purple-500 hover:border-purple-500 mb-4 w-full"
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="border border-gray-300 rounded p-2 focus:border-purple-500 hover:border-purple-500 mb-4 w-full"
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline mr-4"
                  onClick={confirmDeleteAccount}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <img
            className="w-24 h-24 mx-auto rounded-full border-4 border-purple-500"
            src={userDetails.image}
            alt="Profile"
            style={{ borderRadius: '50%' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block mx-auto border-2 border-dashed border-gray-300 p-2 rounded-lg"
          />
          <h2 className="mt-4 text-2xl font-bold text-purple-600">{userDetails.name}</h2>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Account Details</h3>
          <ul className="text-gray-700">
            <li className="flex items-center mb-2">
              <span className="w-20 inline-block text-gray-800">Name:</span>
              <input
                type="text"
                name="name"
                value={editableDetails.name || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 focus:border-purple-500 hover:border-purple-500 w-full"
              />
            </li>
            <li className="flex items-center mb-2">
              <span className="w-20 inline-block text-gray-800">Phone:</span>
              <select className="ml-3 mr-2 border border-gray-300 rounded p-2 focus:border-purple-500 hover:border-purple-500 w-fit">
                <option>+92</option>
              </select>
              <input
                type="tel"
                name="phone"
                value={editableDetails.phone || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 focus:border-purple-500 hover:border-purple-500 w-full"
                pattern="\d{10}"
                title="Phone number should be exactly 10 digits"
              />
            </li>
            <li className="flex items-center mb-2">
              <span className="w-20 inline-block text-gray-800">Address:</span>
              <input
                type="text"
                name="address"
                value={editableDetails.address || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 focus:border-purple-500 hover:border-purple-500 w-full"
              />
            </li>
            <li className="flex items-center mb-2">
              <span className="w-20 inline-block text-gray-800">City:</span>
              <input
                type="text"
                name="city"
                value={editableDetails.city || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 focus:border-purple-500 hover:border-purple-500 w-full"
              />
            </li>
            <li className="flex items-center mb-2">
              <span className="w-20 inline-block text-gray-800">State:</span>
              <input
                type="text"
                name="state"
                value={editableDetails.state || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 focus:border-purple-500 hover:border-purple-500 w-full"
              />
            </li>
            <li className="flex items-center mb-2">
              <span className="w-20 inline-block text-gray-800">ZIP:</span>
              <input
                type="text"
                name="zip"
                value={editableDetails.zip || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 focus:border-purple-500 hover:border-purple-500 w-full"
              />
            </li>
            <li className="flex items-center mb-2">
              <span className="w-20 inline-block text-gray-800">Country:</span>
              <input
                type="text"
                name="country"
                value={editableDetails.country || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 focus:border-purple-500 hover:border-purple-500 w-full"
              />
            </li>
            <li className="flex items-center mb-2">
              <span className="w-20 inline-block text-gray-800">Subscription:</span>
              <span className="ml-5 font-bold">{userDetails.subscription}</span>
              <button
                className="ml-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate('/plan')}
              >
                Change Subscription
              </button>
            </li>
          </ul>
        </div>
        <div className="flex justify-end mt-8">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ml-4"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
