'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import AddExperience from '@/app/components/experience/AddExperience'

export default function AddExperienceLoader() {
    const { data: session, status } = useSession({ required: true })
    if (status === 'loading') return <></>
    if (session.user.isAdmin) {
        return <AddExperience></AddExperience>
    }
}