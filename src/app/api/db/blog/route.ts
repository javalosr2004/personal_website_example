import { NextRequest, NextResponse } from 'next/server'
import startDB from '@/lib/db'
import blogSchema from '@/models/blogSchema'
import slugify from 'slugify'

export async function GET() {
    await startDB()

    const blogs = await blogSchema.find().sort({ posted: -1 })
    return NextResponse.json(blogs)
}

export async function POST(req: NextRequest) {
    await startDB()

    const { title, markdown, description } = await req.json()
    const posted = new Date().toISOString()
    const slug = slugify(title, {
        lower: true,
        replacement: '_',
        remove: /[*+~.()'"!:@]/g,
    })

    const newBlog = new blogSchema({
        slug,
        title,
        posted,
        markdown,
        description,
    })

    try {
        await newBlog.save()
        return NextResponse.json(newBlog)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}
