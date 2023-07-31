import { configureStore } from '@reduxjs/toolkit'
import navReducer from '@/store/navState'

export const store = configureStore({
    reducer: {
        nav: navReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch
