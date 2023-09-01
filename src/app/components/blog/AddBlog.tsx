'use client'

import React from 'react'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RevalidateCache } from '../experience/RevalidateCache'
import { useRouter } from 'next/navigation'

export default function AddBlog() {
    const closeButton = React.useRef<HTMLButtonElement>(null)
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [blog, setBlog] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const router = useRouter()

    async function submitBlog(
        title: string,
        description: string,
        blog: string
    ) {
        setIsSubmitting(true)
        const res = await fetch('/api/db/blog', {
            method: 'POST',
            body: JSON.stringify({ title, description, markdown: blog }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            console.log('Successfully added blog!')
        }
        RevalidateCache(router, 'blog')
        closeButton.current?.click()
        setIsSubmitting(false)
    }

    return (
        <div className="w-200px mt-5">
            <button></button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'outline'}>Add Blog</Button>
                </DialogTrigger>
                {/* sm:max-w-[500px] */}
                <DialogContent className=" lg:max-w-screen-sm overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Add Blog</DialogTitle>
                        <DialogDescription>Add a new blog!</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-5">
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="title">Title:</label>

                            <Input
                                type="text"
                                name="title"
                                id="title"
                                className="w-[30%]"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Input>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="information">Description:</label>
                            <textarea
                                name="information"
                                id="information"
                                className="border-2 border-neutral-200 rounded-md p-2 h-[50px]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="information">Blog:</label>
                            <textarea
                                name="information"
                                id="information"
                                className="border-2 border-neutral-200 rounded-md p-2 lg:h-[200px] h-[150px]"
                                value={blog}
                                onChange={(e) => setBlog(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Button
                                disabled={isSubmitting}
                                onClick={() =>
                                    submitBlog(title, description, blog)
                                }
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogTrigger
                            ref={closeButton}
                            className="hidden"
                        ></DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
