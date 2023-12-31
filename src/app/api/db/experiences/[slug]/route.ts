import { NextRequest, NextResponse } from 'next/server'
import experienceSchema from '@/models/experienceSchema'
import startDB from '@/lib/db'
import { ExperienceState } from '@/store/experienceState'
// import { experienceType } from '@/typings/modelTypes'

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    await startDB()

    try {
        const experience = await experienceSchema
            .findOne({
                slug: params.slug,
            })
            .orFail()
        return NextResponse.json(experience)
    } catch (err) {
        return NextResponse.json('Experience not found.', { status: 404 })
    }
}

// experienceSchema

// slug: { type: String, required: true },
// title: { type: String, required: true },
// description: { type: String, required: true },
// date: { type: String, required: true },
// preview_image: { type: String, required: true },
// detailed: {
//     type: {
//         description: { type: String, required: true },
//         images: { type: [String], required: true },
//         rootFolder: { type: String, required: false },
//         alt: { type: [String], required: false },
//     },
//     required: true,
// },

// type State = {
//     step: number
//     title: string
//     date: DateRange | undefined
//     preview_image: string
//     simple_description: string
//     detailed_description: string
//     carousel_images: string
//     alt?: string
//     root_folder?: string
// }

export async function POST(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { name, job_title, start_date, end_date, detailed }: ExperienceState =
        await req.json()

    const slug = params.slug

    await startDB()
    console.log(slug, name, job_title, start_date, end_date, detailed)

    // attempt to create add to db
    try {
        experienceSchema.create({
            slug,
            name,
            job_title,
            start_date,
            end_date,
            detailed,
        })

        return NextResponse.json('Added new experience!')
    } catch (err) {
        return NextResponse.json(JSON.stringify(err), { status: 401 })
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug
    const updated_data = await req.json()

    await startDB()

    // replace with findOneAndUpdate ()
    try {
        await experienceSchema.findOneAndUpdate({ slug: slug }, updated_data)

        return NextResponse.json('Edited experience!')
    } catch (err) {
        return NextResponse.json(JSON.stringify(err), { status: 401 })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug

    await startDB()

    try {
        await experienceSchema.deleteOne({ slug }).orFail()
        return NextResponse.json('Succesfully deleted experience.')
    } catch (err) {
        return NextResponse.json(err, { status: 400 })
    }
}
