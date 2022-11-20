import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: themeReducer,
    }
});