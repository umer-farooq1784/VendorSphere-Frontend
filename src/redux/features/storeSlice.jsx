import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stores: [],
    selectedStore: null, 
    loading: false,
    error: null,
};

const storeSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        fetchStoresStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchStoresSuccess(state, action) {
            state.loading = true;
            state.stores = action.payload;
        },
        fetchStoresFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        setSelectedStore(state, action) {
            state.selectedStore = action.payload;
        },
        setLoadingFalse(state) {
            state.loading = false;
        },
    },
});

export const { fetchStoresStart, setLoadingFalse,fetchStoresSuccess, fetchStoresFailure, setSelectedStore } = storeSlice.actions; 

export default storeSlice.reducer;