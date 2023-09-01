import { BlogsType } from '@/typings/blogTypes'
import dayjs from 'dayjs'
import React from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
    params: { title: string }
}

// generates from blog api route
export async function generateStaticParams() {
    const res = await fetch(process.env.HOST_URL + '/api/db/blog')
    if (res.ok) {
        const blogs: BlogsType[] = await res.json()
        return blogs.map((blog) => ({
            params: { title: blog.slug },
        }))
    } else {
        return [{ params: { title: '404' } }]
    }
}

async function getBlog(title: string) {
    const res = await fetch(`${process.env.HOST_URL}/api/db/blog/${title}`)

    if (res.ok) {
        const blog: BlogsType = await res.json()
        return blog
    } else {
        return null
    }
}

export default async function Page({ params: { title } }: Props) {
    const blog = await getBlog(title)

    if (blog) {
        return (
            <div className="flex flex-col text-left w-full">
                <div className="mb-10 gap-y-5 flex flex-col border-b-2 border-neutral-200 pb-4 md:w-[400px]">
                    <h1 className="text-4xl font-bold">{blog.title}</h1>
                    <h3 className="text-md font-light text-neutral-500">
                        {dayjs(blog.posted).format('MMMM D, YYYY')}
                    </h3>
                </div>
                <ReactMarkdown
                    className="w-[90%] prose"
                    children={blog.markdown}
                />
            </div>
        )
    } else {
        return (
            <div>
                <ReactMarkdown
                    className="prose"
                    children={'# Page *was* not found sir'}
                />
            </div>
        )
    }
}
