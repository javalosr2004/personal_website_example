'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function TransitionNav({
    children,
}: {
    children: React.ReactNode
}) {
    const navOpen = useSelector<RootState, boolean>((state) => state.nav.open)

    return (
        <div
            className={`md:${
                !navOpen && 'translate-x-[-100px] scale-100 delay-700'
            } transition-all duration-[500ms] md:p-12 p-8 w-full `}
        >
            {children}
        </div>
    )
}
