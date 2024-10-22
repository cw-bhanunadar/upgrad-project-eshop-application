import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action?.payload?.id
      state.email = action?.payload?.email
      state.roles = action?.payload?.roles
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
