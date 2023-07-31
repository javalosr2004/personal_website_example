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
            className={`${
                !navOpen && 'translate-x-[-100px] delay-700'
            } transition-all duration-[500ms] `}
        >
            {children}
        </div>
    )
}
