import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productReducer';
import addressReducer from './addressReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import userReducer from './userReducer';

const persistConfig = {
  key: 'root',
  storage,
};

// Step 3: Combine reducers and create persisted reducer
const rootReducer = combineReducers({
  product: productReducer,
  address: addressReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Step 5: Create a persistor to be used in the app
export const persistor = persistStore(store);
