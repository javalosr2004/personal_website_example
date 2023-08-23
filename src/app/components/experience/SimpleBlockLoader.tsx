import React from 'react'
import SimpleBlock from './SimpleBlock'
import { ExperienceState } from '@/store/experienceState'

async function getExperiences() {
    const DB_URL: string = (process.env.DB_API || '') + '/experiences'
    const res = await fetch(DB_URL, {
        method: 'GET',
        // cache: 'no-store'
        next: {
            tags: ['experiences'],
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

export async function SimpleBlockLoader() {
    const experiences: ExperienceState[] = await getExperiences()

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
