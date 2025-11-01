// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;