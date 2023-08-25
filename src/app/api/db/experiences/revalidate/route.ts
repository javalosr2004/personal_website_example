import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
    // revalidateTag('experiences')
    revalidatePath('/')
    return NextResponse.json('Revalidated experiences!')
}
