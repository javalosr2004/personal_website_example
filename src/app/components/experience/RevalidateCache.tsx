'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function RevalidateCache() {
    const router = useRouter()

    const revalidateExperience = () => {
        fetch('/api/db/experiences/revalidate', {
            method: 'POST',
        })
        router.refresh()
    }

    return (
        <Button onClick={revalidateExperience} className="w-[200px] h-[100px]">
            Click to revalidate.
        </Button>
    )
}
