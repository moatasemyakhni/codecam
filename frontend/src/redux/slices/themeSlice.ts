import { createSlice } from "@reduxjs/toolkit";


interface themeInterface {
    theme: 'dark' | 'light',
}

const initialState: themeInterface = {
    theme: 'dark',
}

const themeSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme(state, action) {
            state.theme = action.payload;
        }
    },
});

export const {
    toggleTheme,

} = themeSlice.actions;

export default themeSlice.reducer;