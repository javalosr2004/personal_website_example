import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NavState {
    open: boolean
    scrollComplete: boolean
}

const initialState: NavState = {
    open: true,
    scrollComplete: false,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setNavOpen(state, action: PayloadAction<boolean>) {
            state.open = action.payload
        },
        setScrollComplete(state, action: PayloadAction<boolean>) {
            state.scrollComplete = action.payload
        },
    },
})

export const { setNavOpen, setScrollComplete } = navSlice.actions
export default navSlice.reducer
