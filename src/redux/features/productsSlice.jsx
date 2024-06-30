import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    selectedProduct: null, 
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action) {
            state.loading = false;
            state.products = action.payload;
        },
        fetchProductsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        setSelectedProduct(state, action) { 
            state.selectedProduct = action.payload;
        },
    },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, setSelectedProduct } = productsSlice.actions; // Export the new action

export default productsSlice.reducer;