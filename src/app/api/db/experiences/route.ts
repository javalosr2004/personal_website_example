import { NextRequest, NextResponse } from 'next/server'
import experienceSchema from '@/models/experienceSchema'
import startDB from '@/lib/db'

export async function GET() {
    await startDB()
    const all_experiences = await experienceSchema.find()
    return NextResponse.json(all_experiences)
}

export async function POST(req: NextRequest) {
    const { title, description, date, images } = await req.json()

    await startDB()

    // attempt to create add to db
    if (images) {
        experienceSchema.create({ title, description, date, images })
    } else {
        experienceSchema.create({ title, description, date })
    }

    return NextResponse.json('Added new experience!')
}
