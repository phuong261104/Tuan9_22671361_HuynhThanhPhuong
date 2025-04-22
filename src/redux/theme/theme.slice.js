import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theme: 'light'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme(state) {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        }
    },
})

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer