import { NextRequest, NextResponse } from 'next/server'
import experienceSchema from '@/models/experienceSchema'
import startDB from '@/lib/db'
import { experienceType } from '@/typings/modelTypes'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
    await startDB()
    const all_experiences: experienceType[] = await experienceSchema.find()
    return NextResponse.json(all_experiences)
}

export async function POST(req: NextRequest) {
    const { slug, title, description, date, preview_image, detailed } =
        await req.json()

    await startDB()

    // attempt to create add to db
    try {
        experienceSchema.create({
            slug,
            title,
            description,
            date,
            preview_image,
            detailed,
        })

        return NextResponse.json('Added new experience!')
    } catch (err) {
        return NextResponse.json(JSON.stringify(err), { status: 401 })
    }
}
