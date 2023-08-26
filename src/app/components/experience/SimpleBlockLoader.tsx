import React from 'react'
import SimpleBlock from './SimpleBlock'
import { ExperienceState } from '@/store/experienceState'
import { Briefcase } from 'lucide-react'

async function getExperiences() {
    const DB_URL: string = (process.env.DB_API || '') + '/experiences'
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
        <div className="relative flex flex-1 flex-col border-slate-200 border-2 rounded-2xl p-4 lg:max-w-[400px] w-[80vw] pb-14">
            <div className="flex flex-row items-center mb-[50px]">
                <Briefcase></Briefcase>
                <h1 className="ml-5 ">Work Experience:</h1>
            </div>
            {experiences.map((experience) => SimpleBlock(experience))}
        </div>
    )
}

//  border-zinc-100 p-6 dark:border-zinc-700/40
// rounded-2xl border border-zinc-700/40
