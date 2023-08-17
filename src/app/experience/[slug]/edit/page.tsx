'use client'

// TODO: Pass in cache from previous page redirect

import { useState, useEffect } from 'react'
import Carousel from '@/app/components/layout/Carousel'
import { Input } from '@/components/ui/input'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import { ExperienceState } from '@/store/experienceState'
import { setTitle } from '@/store/experienceState'

type ParamProps = {
    slug: string
}

export default function EditPage({ params }: { params: ParamProps }) {
    // fetch data from api using client component

    const experience = useSelector<RootState, ExperienceState>(
        (state) => state.experience
    )
    const [valid, setValid] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (experience.slug !== params.slug) {
            setValid(false)
        }
        setLoading(false)
    })

    useEffect(() => {
        console.log(experience)
    }, [experience])

    if (loading) {
        return <div>Loading...</div>
    } else {
        if (!valid) {
            return (
                <div>
                    <h1>Invalid Experience</h1>
                </div>
            )
        }
        return (
            <div className="flex flex-1 flex-col items-center justify-center self-center w-full">
                <Input
                    className="mt-5 md:text-xl font-bold"
                    value={experience?.title}
                    onChange={(e) => {
                        store.dispatch(setTitle(e.currentTarget.value))
                    }}
                ></Input>
                <h3 className="mt-3">{experience?.date as string}</h3>
                <div className="relative mt-8 w-full h-auto md:max-w-[67rem] p-4 ">
                    <Carousel
                        images={experience?.detailed.images as string[]}
                        alt={experience?.detailed.alt as string[]}
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
