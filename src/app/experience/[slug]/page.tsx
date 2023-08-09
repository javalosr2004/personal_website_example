import Carousel from '@/app/components/layout/Carousel'
import { experienceType } from '@/typings/modelTypes'
import React from 'react'

export async function generateStaticParams() {
    const DB_URL: string = (process.env.DB_API || '') + '/experiences'
    const experiences: experienceType[] = await fetch(DB_URL, { method: 'GET' })
        .then((data) => data.json())
        .catch((err) => {
            throw Error(err)
        })

    return experiences.map((experience) => ({
        slug: experience.slug,
    }))
}

export default async function ExperiencePage({
    params,
}: {
    params: { slug: string }
}) {
    console.log('hello')
    const DB_URL: string = (process.env.DB_API || '') + '/experiences'
    console.log('slug ', params.slug)
    const experience = (await fetch(`${DB_URL}/${params.slug}`)
        .then((res) => res.json())
        .catch((err) => {
            throw new Error(err)
        })) as experienceType
    // if (!res.ok) {
    //     throw new Error('Failed to load.')
    // }
    // const experience = (await res.json()) as experienceType

    return (
        <div className="flex flex-1 flex-col items-center justify-center self-center w-full">
            <h1 className="mt-5 md:text-xl font-bold">{experience.title}</h1>
            <h3 className="mt-3">{experience.date}</h3>
            <div className="relative mt-8 w-full h-auto md:max-w-[67rem] p-4 ">
                <Carousel
                    images={experience.detailed.images}
                    alt={experience.detailed.alt || []}
                    path={experience.detailed.rootFolder}
                ></Carousel>
            </div>
            <p>{experience.detailed.description}</p>
        </div>
    )
}

{
    /* <div className="flex flex-col justify-center w-[500px] h-[800px]">
<h1>{experience.title}</h1>
<h3>{experience.date}</h3>
<Carousel
    images={experience.detailed.images}
    alt={experience.detailed.alt || []}
    path={experience.detailed.rootFolder}
></Carousel>
<p>{experience.detailed.description}</p>
</div> */
}
