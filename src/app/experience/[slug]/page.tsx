import EditExperience from '@/app/components/experience/EditExperience'
import Carousel from '@/app/components/layout/Carousel'
import { ExperienceState } from '@/store/experienceState'

import React from 'react'

export async function generateStaticParams() {
    const DB_URL: string = (process.env.DB_API || '') + '/experiences'
    const experiences: ExperienceState[] = await fetch(DB_URL, {
        method: 'GET',
    })
        .then((data) => data.json())
        .catch((err) => {
            throw Error(err)
        })

    return experiences.map((experience) => ({
        slug: experience.slug,
        experience: experience,
    }))
}

export default async function ExperiencePage({
    params,
}: {
    params: { slug: string; experience: ExperienceState }
}) {
    const DB_URL: string = (process.env.DB_API || '') + '/experiences'
    const experiences: ExperienceState[] = await fetch(DB_URL, {
        method: 'GET',
    }).then((data) => data.json())

    const experience = experiences.find(
        (experience) => experience.slug === params.slug
    )

    if (experience) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center self-center w-full">
                <EditExperience
                    slug={params.slug}
                    experience={experience}
                ></EditExperience>
                <h1 className="mt-5 md:text-xl font-bold">
                    {experience.title}
                </h1>
                <h3 className="mt-3">{experience.date as string}</h3>
                <div className="relative mt-8 w-full h-auto md:max-w-[67rem] p-4 ">
                    <Carousel
                        images={experience.detailed.images as string[]}
                        alt={(experience.detailed.alt as string[]) || []}
                        path={experience.detailed.rootFolder}
                    ></Carousel>
                </div>
                <div className="w-[50%] text-center mt-10">
                    <p>{experience.detailed.description}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-[90vw] text-center">
                <h1>Blank page. lol.</h1>
            </div>
        )
    }
}
