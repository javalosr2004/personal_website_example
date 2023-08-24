'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

const revalidateExperience = () => {
    fetch('/api/db/experiences/revalidate', {
        method: 'POST',
    })
}

export const RevalidateCache = async (router: AppRouterInstance) => {
    await revalidateExperience()
    router.push('/')
}
