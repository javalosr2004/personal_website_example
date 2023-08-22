'use client'
import React from 'react'
import { ExperienceState } from '@/store/experienceState'

type Props = {
    experience: ExperienceState
}

export default function SimpleBlock({ experience }: Props) {
    const { title, description } = experience

    const handleClick = () => {
        alert(`You clicked ${title}`)
    }

    // because we use onClick, which is interactive, we must use client
    return (
        <div className="flex w-[90vw] text-center">
            <h1 className="text-slate-700">{title}</h1>
            <h3 onClick={handleClick} className="text-slate-800">
                {description}
            </h3>
        </div>
    )
}
