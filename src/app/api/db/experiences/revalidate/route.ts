import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    // const { secret } = await req.body.json()
    const tag = req.nextUrl.searchParams.get('tag')
    if (tag) {
        revalidateTag(tag)
        return NextResponse.json('Revalidated tag')
    }
    return NextResponse.json('No tag provided', { status: 401 })
}
