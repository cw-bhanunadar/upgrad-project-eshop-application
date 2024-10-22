import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  category: '',
  description: '',
  quantity: 1,
  price: 0,
  imageUrl: '',
  availableQuantity: 0,
  totalPrice: 0
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.category = action.payload.category;
      state.description = action.payload.description;
      state.quantity = action.payload.quantity || 1;
      state.price = action.payload.price;
      state.imageUrl = action.payload.imageUrl;
      state.availableQuantity = action.payload.availableItems;
      state.totalPrice = action.payload.price * action.payload.quantity;
    },
  },
});

export const { setProductDetails } = productSlice.actions;

export default productSlice.reducer;
