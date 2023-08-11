import { NextRequest, NextResponse } from 'next/server'
import experienceSchema from '@/models/experienceSchema'
import startDB from '@/lib/db'
import { State } from '@/app/add/sessionReducer/typings'
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
    const {
        title,
        date,
        preview_image,
        simple_description,
        detailed_description,
        carousel_images,
        alt,
        root_folder,
    }: State = await req.json()

    const slug = params.slug

    await startDB()

    try {
        await experienceSchema.create({
            slug,
            title,
            description: simple_description,
            date: String(date),
            preview_image,
            detailed: {
                description: detailed_description,
                images: carousel_images,
                alt: alt || [],
                rootFolder: root_folder || '',
            },
        })

        return NextResponse.json('Added experience!')
    } catch (err) {
        return NextResponse.json(JSON.stringify(err), { status: 401 })
    }
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
