import { BlogsType } from '@/typings/blogTypes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
    params: { title: string }
}

// generates from blog api route
export async function generateStaticParams() {
    const res = await fetch(process.env.HOST_URL + '/api/db/blog')
    const blogs: BlogsType[] = await res.json()
    if (res.ok) {
        return blogs.map((blog) => ({
            params: { title: blog.slug },
        }))
    }
    return
}

async function getBlog(title: string) {
    const res = await fetch(`${process.env.HOST_URL}/api/db/blog/${title}`)
    const blog: BlogsType = await res.json()
    if (res.ok) {
        return blog
    } else {
        return null
    }
}

export default async function Page({ params: { title } }: Props) {
    const blog = await getBlog(title)

    if (blog) {
        return (
            <div className="flex flex-col text-left ml-10 w-full">
                <h1 className="text-4xl font-bold">{blog.title}</h1>
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
