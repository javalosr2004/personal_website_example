'use client'
import { BlogsType } from "@/typings/blogTypes";
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { RevalidateCache } from "@/app/components/experience/RevalidateCache";
import { useRouter } from "next/navigation";
import { Button } from "react-day-picker";


// TODO: Server side edit paramater
// TODO: Add a way to modify description
export default function EditArticle({params}: {params: {title: string}}){

    const [article, setArticle] = useState<BlogsType | null>(null)
    const [loading, setLoading] = useState(false)
    const [markdown, setMarkdown] = useState('')
    const [title, setTitle] = useState('')
    const router = useRouter()

    const handleSubmit = async () => {
        setLoading(true)
        if (article){
            const res = await fetch(`/api/db/blog/${article.slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    markdown: markdown
                })
            })
            if (res.ok){
                const data = await res.json()
                console.log(data)
                RevalidateCache(router, 'blog')
            }
        }
        setLoading(false)
        router.back()
      
    }

    useEffect(() => {
        if (window){
            const tmp_article = window.localStorage.getItem('article')
            if (tmp_article){
                const parsed = JSON.parse(tmp_article)
                setArticle(parsed)
                setMarkdown(parsed.markdown)
                setTitle(parsed.title)

            }
           
        }
    }, [])

    if (!article || article.slug !== params.title){
        return (
            <div>
                <h1>Article not found</h1>
            </div>
        )
    }
    return (
        <div className="flex flex-col text-left w-full">
        <div className="mb-10 gap-y-5 flex flex-col border-b-2 border-neutral-200 pb-4 md:w-[400px]">
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <Input value={title} onChange={(e) => setTitle(e.currentTarget.value)}></Input>
            <h3 className="text-md font-light text-neutral-500">
                {dayjs(article.posted).format('MMMM D, YYYY')}
            </h3>
        </div>
        <textarea className="h-[300px] w-[50%]" value={markdown} onChange={(e) => setMarkdown(e.currentTarget.value)}></textarea>
        <div className="w-full justify-center">
            <Button className="w-[100px] " onClick={handleSubmit} disabled={loading}>Save</Button>
        </div>
    </div>
    )


}