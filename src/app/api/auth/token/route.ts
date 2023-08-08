import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const token = await getToken({ req })

    if (token) {
        // const token_string = JSON.stringify(token, null, 2)

        return NextResponse.json(token, { status: 200 })
    } else {
        return NextResponse.json({}, { status: 401 })
    }
}
