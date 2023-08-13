'use client'
import React from 'react'
import { Trash2 } from 'lucide-react'

type Props = {
    slug: string
}

// TODO: Add popup for confirmation
// TODO: Check if user is admin to show delete experience.
export default function DeleteExperience({ slug }: Props) {
    const handleClick = async () => {
        await fetch(`/api/db/experiences/${slug}`, { method: 'DELETE' })
    }

    return (
        <div className="absolute z-10 top-4 right-5 border-slate-300  hover:border-slate-500 hover:cursor-pointer border-2 p-2 rounded-full ">
            <Trash2
                onClick={handleClick}
                className="opacity-50 hover:opacity-100  w-[20px] h-[20px]"
            ></Trash2>
        </div>
    )
}
