'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { store } from '@/store'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <SessionProvider>{children}</SessionProvider>
        </Provider>
    )
}
