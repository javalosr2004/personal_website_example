'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { store } from '@/store'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <SessionProvider>{children}</SessionProvider>
            </LocalizationProvider>
        </Provider>
    )
}
