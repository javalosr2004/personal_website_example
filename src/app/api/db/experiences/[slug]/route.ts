import { NextRequest, NextResponse } from 'next/server'
import experienceSchema from '@/models/experienceSchema'
import startDB from '@/lib/db'

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    await startDB()

    const experience = await experienceSchema.findOne({
        slug: params.slug,
    })
    return NextResponse.json(experience)
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug
    const { title, description, date, preview_image, detailed } =
        await req.json()

    await startDB()

    // replace with findOneAndUpdate ()
    try {
        await experienceSchema.findOneAndReplace(
            {
                slug: slug,
            },
            { slug, title, description, date, preview_image, detailed }
        )

        return NextResponse.json('Edited experience!')
    } catch (err) {
        return NextResponse.json(JSON.stringify(err), { status: 401 })
    }
}
