import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
    revalidateTag('experiences')

    return NextResponse.json('Revalidated experiences!')
}
