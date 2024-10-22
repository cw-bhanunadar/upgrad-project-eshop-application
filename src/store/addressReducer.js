import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: ''
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddressDetails: (state, action) => {
      state.id = action.payload.id
    },
  },
});

export const { setAddressDetails } = addressSlice.actions;

export default addressSlice.reducer;
