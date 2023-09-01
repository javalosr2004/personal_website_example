'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

const revalidateExperience = async (tag: string) => {
    await fetch('/api/db/experiences/revalidate?tag=' + tag, {
        method: 'POST',
    })
}

export const RevalidateCache = async (
    router: AppRouterInstance,
    tag: string
) => {
    await revalidateExperience(tag)
    router.refresh()
    router.refresh()
}
