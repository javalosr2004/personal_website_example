import { experienceType } from '@/typings/modelTypes'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

export default function SimpleBlock(experience: experienceType) {
    function previewImage(image: string | undefined) {
        if (image) {
            return (
                <Image
                    src={image}
                    alt=""
                    fill={true}
                    style={{ objectFit: 'scale-down' }}
                ></Image>
            )
        }
    }

    const link = (process.env.HOST_URL || '') + '/experience/' + experience.slug

    return (
        <Link href={link}>
            <div className="flex flex-1 flex-col items-center justify-center border-slate-200 border-2 rounded-xl p-4">
                <h1 className="md:text-xl font-bold">{experience.title}</h1>
                <h3>{experience.date}</h3>
                <div className="relative w-[300px] h-[300px]">
                    {previewImage(experience.preview_image)}
                </div>
                <p>{experience.description}</p>
            </div>
        </Link>
    )
}
