'use client'

// TODO: Pass in cache from previous page redirect

import { experienceType } from '@/typings/modelTypes'
import { useState, useEffect } from 'react'

type ParamProps = {
    slug: string
}

export default function EditPage({ params }: { params: ParamProps }) {
    // fetch data from api using client component

    const [data, setData] = useState<experienceType>()
    const [loading, setLoading] = useState(true)

    const DB_URL: string = (process.env.DB_API || '/api/db') + '/experiences'
    console.log('slug ', params.slug)

    useEffect(() => {
        fetch(DB_URL + '/' + params.slug)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    })

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="w-[100vw] flex flex-col">
                <h1 className="text-center font-bold">Edit Page</h1>
                <h1>{data?.title}</h1>
            </div>
        )
    }
}
