// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default to localStorage
import rootReducer from './rootReducer';
import { combineReducers } from '@reduxjs/toolkit';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['yourReducerName'] // optional: only persist specific reducers
};

// Wrap your rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create a persistor for managing the persisted state
export const persistor = persistStore(store);

// Inject reducer function for async reducers
export const injectReducer = (key, reducer) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(combineReducers({
    ...store.asyncReducers,
    ...persistedReducer,
  }));
};

store.asyncReducers = {};

export default store;
