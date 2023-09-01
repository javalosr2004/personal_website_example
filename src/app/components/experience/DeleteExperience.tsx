'use client'
import React from 'react'
import { Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { RevalidateCache } from './RevalidateCache'
import { cn } from '@/lib/utils'

type Props = {
    route?: string
    slug: string
    className?: string
}

// TODO: Add popup for confirmation
// TODO: Check if user is admin to show delete experience.
export default function DeleteFromDB({
    route = 'experiences',
    slug,
    className,
}: Props) {
    const session = useSession()
    const router = useRouter()

    const handleClick = async (event: React.MouseEvent) => {
        event.stopPropagation()
        await fetch(`/api/db/${route}/${slug}`, { method: 'DELETE' })
        await RevalidateCache(router, route)
    }

    if (session.data?.user.isAdmin) {
        return (
            <div
                className={cn(
                    'group absolute z-10 hover:cursor-pointer  rounded-full  hover:bg-white w-[40px] h-[40px]',
                    className
                )}
            >
                <Trash2
                    onClick={handleClick}
                    className="opacity-0 group-hover:opacity-100 w-full h-full"
                ></Trash2>
            </div>
        )
    }
    return <></>
}
