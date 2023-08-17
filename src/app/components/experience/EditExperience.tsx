'use client'
import React from 'react'
import { Pencil } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { store } from '@/store'
import { ExperienceState, setExperience } from '@/store/experienceState'

type Props = {
    slug: string
    experience: ExperienceState
}

// TODO: Add popup for confirmation
// TODO: Check if user is admin to show delete experience.
export default function EditExperience({ slug, experience }: Props) {
    const router = useRouter()
    const session = useSession()

    // TODO: Add modal to edit experience via experience/[slug]/edit
    const handleClick = () => {
        store.dispatch(setExperience(experience))
        router.push(`/experience/${slug}/edit`)
    }

    if (session.data?.user.isAdmin) {
        return (
            <div
                onClick={handleClick}
                className="group absolute z-10 top-4 right-5 border-slate-300  hover:border-slate-500 hover:cursor-pointer border-2 p-2 rounded-full "
            >
                <Pencil className="opacity-50 group-hover:opacity-100 w-[20px] h-[20px]"></Pencil>
            </div>
        )
    }
    return <></>
}
