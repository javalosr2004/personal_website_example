'use client'
import React from 'react'
import { Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { RevalidateCache } from './RevalidateCache'

type Props = {
    slug: string
}

// TODO: Add popup for confirmation
// TODO: Check if user is admin to show delete experience.
export default function DeleteExperience({ slug }: Props) {
    const session = useSession()
    const router = useRouter()

    const handleClick = async (event: React.MouseEvent) => {
        event.stopPropagation()
        await fetch(`/api/db/experiences/${slug}`, { method: 'DELETE' })
        await RevalidateCache(router)
    }

    if (session.data?.user.isAdmin) {
        return (
            <div className="group absolute z-10 hover:cursor-pointer  rounded-full  hover:bg-white">
                <Trash2
                    onClick={handleClick}
                    className="opacity-0 group-hover:opacity-100 w-[40px] h-[40px]"
                ></Trash2>
            </div>
        )
    }
    return <></>
}
