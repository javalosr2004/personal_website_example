import React from 'react'
import ResumeBlockLoader from '../components/resume/ResumeBlockLoader'
import { ResumeType } from '@/typings/resumeTypes'

const topics: string[] = ['work', 'education', 'projects', 'skills']

async function getResume() {
    const res = await fetch(`${process.env.HOST_URL}/api/db/resume`, {
        method: 'GET',
        next: {
            tags: ['experiences'],
            revalidate: 3600,
        },
    })

    if (!res.ok) {
        console.log('error fetching experiences')
        return null
    }
    const data: { [key: string]: ResumeType[] } = await res.json()
    if (typeof data != 'object' || typeof data == 'string') {
        return null
    }
    return data
}

export default async function Page() {
    const resume = await getResume()
    if (resume) {
        console.log(resume)
        return (
            <div className="flex flex-col">
                <header>
                    <h1 className="md:text-4xl text-2xl font-extrabold">
                        Jesus Angel Avalos-Regalado
                    </h1>
                    <p className="mt-5 md:text-sm text-xs">
                        Santa Cruz, CA •
                        <a
                            type="email"
                            className="ml-2 mt-2 hover:underline"
                            href="jesusavalosr2004@gmail.com"
                        >
                            jesusavalosr2004@gmail.com
                        </a>{' '}
                        •
                        <a
                            className="ml-2 mt-2 hover:underline"
                            href="https://www.github.com/javalosr"
                        >
                            github.com/jesusavalosr
                        </a>{' '}
                        •
                        <a
                            className="ml-2 mt-2 hover:underline"
                            href="https://www.linkedin.com/javalosr"
                        >
                            linkedin.com/javalosr
                        </a>
                    </p>
                </header>
                <div className="space-y-20 md:mt-10">
                    {topics.map((topic, index) => {
                        return (
                            <ResumeBlockLoader
                                topic={topic[0].toUpperCase() + topic.slice(1)}
                                topic_data={resume[topic]}
                                key={index}
                            ></ResumeBlockLoader>
                        )
                    })}
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col text-left">
            <header>
                <h1 className="md:text-4xl text-2xl font-extrabold">
                    Jesus Angel Avalos-Regalado
                </h1>
                <p className="mt-5 md:text-sm text-xs">
                    Santa Cruz, CA •
                    <a
                        type="email"
                        className="ml-2 mt-2 hover:underline"
                        href="jesusavalosr2004@gmail.com"
                    >
                        jesusavalosr2004@gmail.com
                    </a>{' '}
                    •
                    <a
                        className="ml-2 mt-2 hover:underline"
                        href="https://www.github.com/javalosr"
                    >
                        github.com/jesusavalosr
                    </a>{' '}
                    •
                    <a
                        className="ml-2 mt-2 hover:underline"
                        href="https://www.linkedin.com/javalosr"
                    >
                        linkedin.com/javalosr
                    </a>
                </p>
            </header>
        </div>
    )
}
