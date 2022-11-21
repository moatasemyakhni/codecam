import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: themeReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;