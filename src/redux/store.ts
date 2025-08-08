import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import reducers
import authReducer from './slices/authSlice';
import ordersReducer from './slices/ordersSlice';
import uiReducer from './slices/uiSlice';
import magazinesReducer from './slices/magazinesSlice';
import articlesReducer from './slices/articlesSlice';
import digestsReducer from './slices/digestsSlice';

// Redux persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Persist auth state
};  

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  ui: uiReducer,
  magazines: magazinesReducer,
  articles: articlesReducer,
  digests: digestsReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export as RStore for compatibility with _layout.tsx
export const RStore = store;