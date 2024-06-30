const SET_USER_DETAILS = 'SET_USER_DETAILS';

// Initial state
const initialState = {
  name: '',
  email: '',
  image: null,
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  created_at: '',
  updated_at: '',
  subscription: null,
};

// Helper function to determine if a URL is absolute
const isAbsoluteUrl = (url) => {
  return url.startsWith('http://') || url.startsWith('https://');
};

// Reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state, 
        ...action.payload, 
        subscription: action.payload.subscription || state.subscription, 
      };
    default:
      return state;
  }
};

// Action creator
export const setUserDetails = (userDetails) => {
  const baseUrl = 'https://backendapi-2uwijg3jda-el.a.run.app/';

  
  const imageUrl = userDetails.image
    ? isAbsoluteUrl(userDetails.image)
      ? userDetails.image
      : baseUrl + userDetails.image.replace(/^\/+/, '') 
    : null;

  return {
    type: SET_USER_DETAILS,
    payload: {
      ...userDetails,
      image: imageUrl,
    },
  };
};

export default userReducer;
