import client from '../../api/api';

const SET_SEARCHED_PRODUCTS = 'SET_SEARCHED_PRODUCTS';
const FETCH_SEARCHED_PRODUCTS_REQUEST = 'FETCH_SEARCHED_PRODUCTS_REQUEST';
const FETCH_SEARCHED_PRODUCTS_FAILURE = 'FETCH_SEARCHED_PRODUCTS_FAILURE';

const initialState = {
  searchedProducts: [],
  loading: false,
  error: null,
};

const searchedProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCHED_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_SEARCHED_PRODUCTS:
      return {
        ...state,
        loading: false,
        searchedProducts: action.payload,
      };
    case FETCH_SEARCHED_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // Add a new action type to clear search results
    case 'CLEAR_SEARCHED_PRODUCTS':
      return {
        ...state,
        searchedProducts: [], // Clear the searchedProducts array
      };
    default:
      return state;
  }
};

export const fetchSearchedProducts = (searchTerm, page) => {
  if (page == null) {
    page = 1;
  }
  return async (dispatch) => {
    dispatch({ type: FETCH_SEARCHED_PRODUCTS_REQUEST });
    try {
      const response = await client.get(`api/searchproducts/?name=${searchTerm}&page=${page}`);
      dispatch(setSearchedProducts(response.data.similar_products));
    } catch (error) {
      dispatch({ type: FETCH_SEARCHED_PRODUCTS_FAILURE, payload: error.message });
    }
  };
};

export const setSearchedProducts = (searchedProducts) => {
  return {
    type: SET_SEARCHED_PRODUCTS,
    payload: searchedProducts,
  };
};

// Action creator to clear search results
export const clearSearchedProducts = () => {
  return {
    type: 'CLEAR_SEARCHED_PRODUCTS',
  };
};

export default searchedProductReducer;
