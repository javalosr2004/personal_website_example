'use client'

import React from 'react'
import SimpleBlock from './SimpleBlock'
import { ExperienceState } from '@/store/experienceState'

// async function getExperiences() {
//     const DB_URL: string = (process.env.DB_API || '') + '/experiences'
//     const res = await fetch(DB_URL, {
//         method: 'GET',
//         // cache: 'no-store'
//         next: {
//             tags: ['experiences'],
//         },
//     })
//     if (!res.ok) {
//         return {}
//     }
//     const experiences = await res.json()
//     if (typeof experiences == 'string') {
//         return JSON.parse(experiences)
//     } else if (typeof experiences == 'object') {
//         return experiences
//     } else {
//         return {}
//     }
// }

import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

import { Skeleton } from '@/components/ui/skeleton'

export function SimpleBlockLoader() {
    // const experiences: ExperienceState[] = await getExperiences()
    const { data, isLoading } = useSWR<ExperienceState[], boolean>(
        '/api/db/experiences',
        fetcher
    )

    if (isLoading) {
        return (
            <div>
                <h1 className="mt-10 underline underline-offset-1 mb-[50px]">
                    Past Work:
                </h1>
                <div className="grid lg:grid-cols-2 gap-10 ">
                    <Skeleton className="w-[560] h-[400px]"></Skeleton>
                </div>
            </div>
        )
    }
    return (
        <div>
            <h1 className="mt-10 underline underline-offset-1 mb-[50px]">
                Past Work:
            </h1>
            <div className="grid lg:grid-cols-2 gap-10 ">
                {data?.map((experience) => SimpleBlock(experience))}
            </div>
        </div>
    )
}
