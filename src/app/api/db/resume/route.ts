import startDB from '@/lib/db'
import experienceSchema from '@/models/experienceSchema'
import { experienceType } from '@/typings/modelTypes'
import { ResumeType } from '@/typings/resumeTypes'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const topics: string[] = ['work', 'education', 'projects', 'skills']

    const topic = req.nextUrl.searchParams.get('topic')

    await startDB()
    const experiences: experienceType[] = await experienceSchema.find()
    const parsed: { [key: string]: ResumeType[] } = {}
    topics.forEach((topic) => {
        parsed[topic] = []
    })

    function generateName(experience: experienceType) {
        if (experience.job_title && experience.job_title != '') {
            return `${experience.job_title} - ${experience.name}`
        }
        return experience.name
    }

    // group together experiences by topic
    experiences.forEach((experience) => {
        if (parsed[experience.detailed.topic]) {
            parsed[experience.detailed.topic].push({
                title: generateName(experience),
                information: experience.detailed.information,
                start: experience.start_date,
                end: experience.end_date,
            })
        } else {
            parsed[experience.detailed.topic] = [
                {
                    title: generateName(experience),
                    information: experience.detailed.information,
                    start: experience.start_date,
                    end: experience.end_date,
                },
            ]
        }
    })

    if (!topic) {
        return NextResponse.json(parsed)
    } else if (topic && parsed[topic]) {
        return NextResponse.json(parsed[topic])
    } else {
        return NextResponse.json('Invalid topic', { status: 401 })
    }
}
