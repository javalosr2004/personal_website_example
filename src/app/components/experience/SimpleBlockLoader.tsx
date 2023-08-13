import React from 'react'
import { experienceType } from '@/typings/modelTypes'
import SimpleBlock from './SimpleBlock'

async function getExperiences() {
    const DB_URL: string = (process.env.DB_API || '') + '/experiences'
    const res = await fetch(DB_URL, {
        method: 'GET',
        next: {
            revalidate: 0,
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
    const experiences: experienceType[] = await getExperiences()

    return (
        <div className="grid lg:grid-cols-2 gap-10 ">
            {experiences.map((experience) => SimpleBlock(experience))}
        </div>
    )
}
