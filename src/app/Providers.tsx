'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { store } from '@/store'
import TransitionNav from './components/layout/TransitionNav'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <SessionProvider>
                <TransitionNav>{children}</TransitionNav>
            </SessionProvider>
        </Provider>
    )
}
