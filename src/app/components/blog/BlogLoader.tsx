import React from 'react'
import { BlogsType } from '@/typings/blogTypes'
import Link from 'next/link'
import dayjs from 'dayjs'
import DeleteFromDB from '../experience/DeleteExperience'

async function getBlogPosts() {
    const res = await fetch(process.env.HOST_URL + '/api/db/blog', {
        method: 'GET',
        next: {
            tags: ['blog'],
        },
    })
    const data: BlogsType[] = await res.json()
    return data
}

export default async function SimpleBlogLoader() {
    const blogPosts = await getBlogPosts()

    return (
        <div className="flex flex-col gap-16">
            {blogPosts.map((post) => {
                return (
                    <article className="group relative flex flex-col items-start">
                        <DeleteFromDB
                            route="blog"
                            slug={post.slug}
                            className="top-0 right-5 w-[25px] h-[25px] z-30"
                        />
                        <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                            <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                            <Link href={'/articles/' + post.slug}>
                                <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                                <span className="relative z-10">
                                    {dayjs(post.posted).format('MMMM D, YYYY')}
                                </span>
                            </Link>
                        </h2>
                        <p className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                            <span
                                className="absolute inset-y-0 left-0 flex items-center"
                                aria-hidden="true"
                            >
                                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                            </span>
                            {post.title}
                        </p>
                        <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            {post.markdown.substring(0, 200) + '...'}
                        </p>
                        <div
                            aria-hidden="true"
                            className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                        >
                            Read more
                            <svg
                                viewBox="0 0 16 16"
                                fill="none"
                                aria-hidden="true"
                                className="ml-1 h-4 w-4 stroke-current"
                            >
                                <path
                                    d="M6.75 5.75 9.25 8l-2.5 2.25"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}
