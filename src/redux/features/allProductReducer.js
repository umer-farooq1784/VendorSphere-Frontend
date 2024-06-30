import client from '../../api/api'

const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS'
const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

const initialState = {
  products: [],
  loading: false,
  error: null,
}

const allProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case SET_ALL_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      }
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST })
    try {
      const response = await client.get('api/get_top_products')
      dispatch(setAllProducts(response.data.results))
    } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message })
    }
  }
}

export const setAllProducts = (products) => {
  return {
    type: SET_ALL_PRODUCTS,
    payload: products,
  }
}

export default allProductReducer
