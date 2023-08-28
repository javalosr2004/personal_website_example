'use client'
import React from 'react'

export default function TransitionNav({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={`transition-all duration-500 w-[90vw] p-10`}>
            {children}
        </div>
    )
}

//old movement
