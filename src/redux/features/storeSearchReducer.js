import client from '../../api/api';

const SET_STORES = 'SET_STORES';
const FETCH_STORES_REQUEST = 'FETCH_STORES_REQUEST';
const FETCH_STORES_FAILURE = 'FETCH_STORES_FAILURE';

const initialState = {
  stores: [],
  loading: false,
  error: null,
};

const searchStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_STORES:
      return {
        ...state,
        loading: false,
        stores: action.payload,
      };
    case FETCH_STORES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CLEAR_STORES':
      return {
        ...state,
        stores: [],
      };
    default:
      return state;
  }
};

export const fetchSearchedStores = (searchTerm,page) => {
  if (page == null) {
    page = 1;
  }
  return async (dispatch) => {
    dispatch({ type: FETCH_STORES_REQUEST });
    try {
      const response = await client.get(`api/searchstores/?name=${searchTerm}&page=${page}`);
      
      dispatch(setStores(response.data.similar_stores));
    } catch (error) {
      dispatch({ type: FETCH_STORES_FAILURE, payload: error.message });
    }
  };
};

export const setStores = (stores) => {
  return {
    
    type: SET_STORES,
    payload: stores,
  };
};

export const clearSearchedStores = () => {
  return {
    type: 'CLEAR_STORES',
  };
};

export default searchStoreReducer;
