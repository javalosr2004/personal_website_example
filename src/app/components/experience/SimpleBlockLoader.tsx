import React from 'react'
import SimpleBlock from './SimpleBlock'
import { ExperienceState } from '@/store/experienceState'
import { Briefcase } from 'lucide-react'

async function getExperiences() {
    const DB_URL: string =
        process.env.HOST_URL + '/api/db/experiences?topic=work'
    const res = await fetch(DB_URL, {
        method: 'GET',

        // cache: 'no-store'
        next: {
            tags: ['experiences'],
            revalidate: 3600,
        },
    })
    if (!res.ok) {
        return {}
    }
    const experiences = await res.json()
    if (typeof experiences == 'string') {
        return JSON.parse(experiences)
    } else if (typeof experiences == 'object') {
        return experiences
    } else {
        return {}
    }
}

// async function getExperiences() {
//     await startDB()
//     const all_experiences: ExperienceState[] = await experienceSchema.find()
//     return all_experiences
// }

export async function SimpleBlockLoader() {
    const experiences: ExperienceState[] = await getExperiences()

    return (
        <div className="space-y-10 lg:pl-16 xl:pl-24">
            <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700/40 pb-10">
                <div className="flex flex-row items-center mb-[50px]">
                    <Briefcase></Briefcase>
                    <h1 className="ml-5 ">Work:</h1>
                </div>
                {/* give all of these items a gap */}
                <div className="gap-y-5 flex flex-col">
                    {experiences.map((experience) => SimpleBlock(experience))}
                </div>
            </div>
        </div>
    )
}

//  border-zinc-100 p-6 dark:border-zinc-700/40
// rounded-2xl border border-zinc-700/40
