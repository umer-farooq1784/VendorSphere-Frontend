import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    price: 200,
    isButtonClickedStore: false,
    isButtonClickedProduct: false,
    storeId: null,
  },
  reducers: {
    setDefaultPrice: (state, action) => {
      state.price = action.payload;
    },
    setIsButtonClickedStore: (state, action) => {
      state.isButtonClickedStore = action.payload;
    },
    setIsButtonClickedProduct: (state, action) => {
      state.isButtonClickedProduct = action.payload;
    },
    setStoreId: (state, action) => {
      state.storeId = action.payload;
    },
  },
});

export const { setDefaultPrice, setIsButtonClickedProduct, setIsButtonClickedStore, setStoreId } = paymentSlice.actions;
export default paymentSlice.reducer;
