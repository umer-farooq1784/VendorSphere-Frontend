import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedPlan: null,
};

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        selectPlan: (state, action) => {
            state.selectedPlan = action.payload;
        },
    },
});

export const { selectPlan } = planSlice.actions;

export default planSlice.reducer;
