import { experienceType } from '@/typings/modelTypes'
import Image from 'next/image'
import React from 'react'

export default function SimpleBlock(experience: experienceType) {
    function previewImage(images: string[] | undefined) {
        if (images && images.length > 0) {
            return (
                <Image
                    src={images[0]}
                    alt=""
                    fill={true}
                    style={{ objectFit: 'scale-down' }}
                ></Image>
            )
        }
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <h1 className="md:text-xl font-bold">{experience.title}</h1>
            <h3>{experience.date}</h3>
            <div className="relative w-[300px] h-[300px]">
                {previewImage(experience.images)}
            </div>
            <p>{experience.description}</p>
        </div>
    )
}
