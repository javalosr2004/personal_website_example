'use client'

// TODO: Pass in cache from previous page redirect

import { experienceType } from '@/typings/modelTypes'
import { useState, useEffect } from 'react'
import Carousel from '@/app/components/layout/Carousel'
import { Input } from '@/components/ui/input'

type ParamProps = {
    slug: string
}

export default function EditPage({ params }: { params: ParamProps }) {
    // fetch data from api using client component

    const [experience, setExperience] = useState<experienceType>()
    const [loading, setLoading] = useState(true)

    const DB_URL: string = (process.env.DB_API || '/api/db') + '/experiences'
    console.log('slug ', params.slug)

    useEffect(() => {
        fetch(DB_URL + '/' + params.slug)
            .then((res) => res.json())
            .then((data) => {
                setExperience(data)
                setLoading(false)
            })
    })

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="flex flex-1 flex-col items-center justify-center self-center w-full">
                <Input
                    className="mt-5 md:text-xl font-bold"
                    value={experience?.title}
                ></Input>
                <h3 className="mt-3">{experience?.date}</h3>
                <div className="relative mt-8 w-full h-auto md:max-w-[67rem] p-4 ">
                    <Carousel
                        images={experience?.detailed.images || []}
                        alt={experience?.detailed.alt || []}
                        path={experience?.detailed.rootFolder}
                    ></Carousel>
                </div>
                <div className="w-[50%] text-center mt-10">
                    <Input value={experience?.detailed.description}></Input>
                </div>
            </div>
        )
    }
}
