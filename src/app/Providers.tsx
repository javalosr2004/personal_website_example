'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { store } from '@/store'

export default function Providers({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <Provider store={store}>
            <SessionProvider>
                <div className={className || ''}>{children}</div>
            </SessionProvider>
        </Provider>
    )
}
