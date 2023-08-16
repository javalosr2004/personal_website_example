import { configureStore } from '@reduxjs/toolkit'
import navReducer from '@/store/navState'
import experienceReducer from '@/store/experienceState'

export const store = configureStore({
    reducer: {
        nav: navReducer,
        experience: experienceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch
