import startDB from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    await startDB()
    return NextResponse.json('Hello World!')
}
