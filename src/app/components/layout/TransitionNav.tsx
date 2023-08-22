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
            className={`
        md:${!navOpen ? 'translate-x-[-100px]' : 'p-[50px]'}
         transition-all duration-500 w-[100vw]`}
        >
            {children}
        </div>
    )
}

//old movement
