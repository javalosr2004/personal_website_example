import React from 'react'
import SimpleBlock from './SimpleBlock'
import { ExperienceState } from '@/store/experienceState'
import { Skeleton } from '@/components/ui/skeleton'
import startDB from '@/lib/db'
import experienceSchema from '@/models/experienceSchema'

// async function getExperiences() {
//     const DB_URL: string = (process.env.DB_API || '') + '/experiences'
//     const res = await fetch(DB_URL, {
//         method: 'GET',
//         // cache: 'no-store'
//         next: {
//             tags: ['experiences'],
//             revalidate: 3600,
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

async function getExperiences() {
    await startDB()
    const all_experiences: ExperienceState[] = await experienceSchema.find()
    return all_experiences
}

export async function SimpleBlockLoader() {
    const experiences = await getExperiences()

    if (!experiences) {
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
                {experiences.map((experience) => SimpleBlock(experience))}
            </div>
        </div>
    )
}
