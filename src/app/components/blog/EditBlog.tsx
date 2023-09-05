'use client'
import React from 'react'
import { Pencil } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BlogsType } from '@/typings/blogTypes'

type Props = {
    slug: string
    article: BlogsType
}

// TODO: Add popup for confirmation
// TODO: Check if user is admin to show delete experience.
export default function EditBlog({ slug, article }: Props) {
    const router = useRouter()
    const session = useSession()

    // TODO: Add modal to edit experience via experience/[slug]/edit
    const handleClick = () => {
        if (window){
            window.localStorage.setItem('article', JSON.stringify(article))
        }
        router.push(`/articles/${slug}/edit`)
    }

    if (session.data?.user.isAdmin) {
        return (
            <div
                onClick={handleClick}
                className="group w-[40px] h-[40px] flex justify-center items-center z-10  border-slate-300  hover:border-slate-500 hover:cursor-pointer border-2 rounded-full "
            >
                <Pencil className="opacity-50 group-hover:opacity-100 "></Pencil>
            </div>
        )
    }
    return <></>
}
