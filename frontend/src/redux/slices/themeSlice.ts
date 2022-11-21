import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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
        toggleTheme(state, action: PayloadAction<themeInterface>) {
            state.theme = action.payload.theme;
        }
    },
});

export const {
    toggleTheme,

} = themeSlice.actions;

export default themeSlice.reducer;