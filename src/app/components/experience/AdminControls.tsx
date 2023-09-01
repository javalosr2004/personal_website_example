'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import AddExperience from '@/app/components/experience/AddExperience'
import AddBlog from '../blog/AddBlog'

export default function AdminControls() {
    const { data: session, status } = useSession()
    if (status !== 'authenticated') return <></>
    if (session.user.isAdmin) {
        return (
            <div className="flex flex-row gap-x-5 absolute">
                <AddExperience></AddExperience>
                <AddBlog></AddBlog>
            </div>
        )
    }
}
