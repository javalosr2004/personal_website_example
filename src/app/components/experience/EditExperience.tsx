'use client'
import React from 'react'
import { Pencil } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {
    slug: string
    edit: boolean
}

// TODO: Add popup for confirmation
// TODO: Check if user is admin to show delete experience.
export default function EditExperience({ slug }: Props) {
    const router = useRouter()

    const session = useSession()

    // TODO: Add modal to edit experience via experience/[slug]/edit
    const handleClick = () => {
        router.push(`/experience/${slug}/edit`)
    }

    if (session.data?.user.isAdmin) {
        return (
            <div className="group absolute z-10 top-4 right-5 border-slate-300  hover:border-slate-500 hover:cursor-pointer border-2 p-2 rounded-full ">
                <Pencil
                    onClick={handleClick}
                    className="opacity-50 group-hover:opacity-100 w-[20px] h-[20px]"
                ></Pencil>
            </div>
        )
    }
    return <></>
}
