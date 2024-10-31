import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import questReducer from './slices/questSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    quests: questReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;