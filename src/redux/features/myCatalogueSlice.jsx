import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    stores: [],
    selectedProduct: null, 
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'mycatalogue',
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
        fetchStoresSuccess(state, action) {
            state.loading = false;
            state.stores = action.payload;
        },
        fetchProductsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchStoresFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        setSelectedProduct(state, action) { 
            state.selectedProduct = action.payload;
        },
    },
});

export const { fetchProductsStart, fetchStoresFailure, fetchStoresSuccess, fetchProductsSuccess, fetchProductsFailure, setSelectedProduct } = productsSlice.actions; // Export the new action

export default productsSlice.reducer;