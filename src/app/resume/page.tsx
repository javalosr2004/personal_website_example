import React from 'react'
// import ResumeBlockLoader from '../components/resume/ResumeBlockLoader'
// import { ResumeBroadType } from '@/typings/resumeTypes'

// async function getResume() {
//     const res = await fetch('/api/resume')
//     const data: ResumeBroadType[] = await res.json()
//     return data
// }

export default async function Page() {
    // const resume = await getResume()

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
            {/* <div>
                {resume.map((data, index) => {
                    return (
                        <ResumeBlockLoader
                            topic={data.topic}
                            topic_data={data.topic_data}
                            key={index}
                        ></ResumeBlockLoader>
                    )
                })}
            </div> */}
        </div>
    )
}
