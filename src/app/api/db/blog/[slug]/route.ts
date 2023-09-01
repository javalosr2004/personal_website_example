import startDB from '@/lib/db'
import blogSchema from '@/models/blogSchema'
import { NextRequest, NextResponse } from 'next/server'
type Params = {
    params: {
        slug: string
    }
}
export async function GET(req: NextRequest, { params: { slug } }: Params) {
    await startDB()
    try {
        const blog = await blogSchema.findOne({ slug }).orFail()
        return NextResponse.json(blog)
    } catch (err) {
        return NextResponse.json('Blog not found.', { status: 404 })
    }
}

export async function DELETE(req: NextRequest, { params: { slug } }: Params) {
    await startDB()
    try {
        await blogSchema.deleteOne({ slug }).orFail()
        return NextResponse.json('Blog deleted.', { status: 200 })
    } catch (err) {
        return NextResponse.json('Blog not found.', { status: 404 })
    }
}
