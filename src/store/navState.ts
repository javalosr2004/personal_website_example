import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NavState {
    open: boolean
}

const initialState: NavState = {
    open: true,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setNavOpen(state, action: PayloadAction<boolean>) {
            state.open = action.payload
        },
    },
})

export const { setNavOpen } = navSlice.actions
export default navSlice.reducer
