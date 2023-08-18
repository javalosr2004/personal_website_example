import React from 'react'

import ImageSignIn from './components/signin/ImageSignIn'
// import { getServerSession } from 'next-auth'
// import { experienceType } from '@/typings/modelTypes'
import AddExperience from './add/page'
import SimpleBlock from './components/experience/SimpleBlock'
// import { SimpleBlockLoader } from './components/experience/SimpleBlockLoader'
import type { ExperienceState } from '@/store/experienceState'

async function getExperiences() {
    const DB_URL: string = (process.env.DB_API || '') + '/experiences'
    const res = await fetch(DB_URL, {
        method: 'GET',
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

export default async function HomePage() {
    // const session = await getServerSession()
    const session = { user: { name: 'Jesus' } }
    const experiences = await getExperiences()

    return (
        <div className={`flex flex-col w-[90vw]`}>
            <div className="xl:max-w-5xl lg:max-w-4xl  mb-10 flex flex-row self-center">
                <div className="mr-10 flex flex-col justify-around my-10">
                    <h1 className="mt-4 text-2xl md:text-4xl">
                        <b>
                            Developer.
                            <br /> Student. Husband. <br />
                            {/* {Object.keys(session).length !== 0 && (
                                <b>Now Signed In.</b>
                            )} */}
                        </b>
                    </h1>
                    <h2 className="mt-8 lg:mt-0 md:text-xl">
                        Hi, I'm <b>Jesus Avalos</b>, I am sophmore studying
                        Computer Science at Cal Poly - San Luis Obispo
                        <span className="text-xl"> 🐎</span>
                        {session && (
                            <div>
                                <br />
                                <b>Welcome, {session.user?.name}</b>
                                <br />
                                {Object.keys(session || {}).length !== 0 && (
                                    <AddExperience></AddExperience>
                                )}
                            </div>
                        )}
                    </h2>
                </div>
                <div className="flex flex-row md:ml-24">
                    <ImageSignIn
                        authenticated={Object.keys(session || {}).length !== 0}
                    ></ImageSignIn>
                    <div className="pt-4"></div>
                </div>
            </div>

            <h1 className="mt-10 underline underline-offset-1 mb-[50px]">
                Past Work:
            </h1>

            <div className="w[100vw]">
                <div className="grid lg:grid-cols-2 gap-10 mr-10">
                    {experiences.map((experience: ExperienceState) =>
                        SimpleBlock(experience)
                    )}
                </div>
            </div>
        </div>
    )
}
