import React from 'react'

import ImageSignIn from './components/signin/ImageSignIn'
// import { getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]/options'
// import { experienceType } from '@/typings/modelTypes'
// import SimpleBlock from './components/experience/SimpleBlock'
// import { SimpleBlockLoader } from './components/experience/SimpleBlockLoader'
// import type { ExperienceState } from '@/store/experienceState'
import AddExperienceLoader from './components/experience/AddExperienceLoader'
import { SimpleBlockLoader } from './components/experience/SimpleBlockLoader'
import RevalidateCache from './components/experience/RevalidateCache'

// async function getExperiences() {
//     const DB_URL: string = (process.env.DB_API || '') + '/experiences'
//     const res = await fetch(DB_URL, {
//         method: 'GET',
//         cache: 'force-cache',
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

export default async function HomePage() {
    // const session = await getServerSession(authOptions)
    // // const session = { user: { name: 'Jesus' } }
    // const experiences = await getExperiences()

    return (
        <div className={`flex flex-col w-[100vw] p-[30px] lg:px-[150px]`}>
            <div className="xl:max-w-5xl lg:max-w-4xl  mb-10 flex flex-row self-center">
                <div className="mr-10 flex flex-col justify-around my-10">
                    <h1 className="mt-4 text-2xl md:text-4xl">
                        <b>
                            Developer.
                            <br /> Student. Husband. <br />
                        </b>
                    </h1>
                    <h2 className="mt-8 lg:mt-0 md:text-xl">
                        Hi, I'm <b>Jesus Avalos</b>, I am sophmore studying
                        Computer Science at Cal Poly - San Luis Obispo
                        <span className="text-xl"> 🐎</span>
                        {/* {session && ( */}
                        <div>
                            <br />
                            {/* <b>Welcome, {session.user?.name}</b>
                                <br /> */}
                            <AddExperienceLoader />
                        </div>
                        {/* )} */}
                    </h2>
                </div>
                <div className="flex flex-row md:ml-24">
                    <ImageSignIn></ImageSignIn>
                    {/* <RevalidateCache></RevalidateCache> */}
                </div>
            </div>

            <SimpleBlockLoader></SimpleBlockLoader>
        </div>
    )
}
