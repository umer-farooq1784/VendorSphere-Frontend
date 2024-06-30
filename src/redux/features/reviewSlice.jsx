import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviews: [], 
    selectedProductReviews: [], 
    loading: false,
    error: null,
};

const reviewsSlice = createSlice({
    name: 'reviews', 
    initialState,
    reducers: {
        fetchReviewsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchReviewsSuccess(state, action) {
            state.loading = false;
            state.reviews = action.payload;
        },
        fetchReviewsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        setSelectedProductReviews(state, action) { 
            state.selectedProductReviews = action.payload;
        },
    },
});

export const { fetchReviewsStart, fetchReviewsSuccess, fetchReviewsFailure, setSelectedProductReviews } = reviewsSlice.actions; 

export default reviewsSlice.reducer;
