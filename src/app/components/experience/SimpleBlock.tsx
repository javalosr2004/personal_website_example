import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import DeleteExperience from './DeleteExperience'
import { ExperienceState } from '@/store/experienceState'

export default async function SimpleBlock(experience: ExperienceState) {
    function previewImage(image: string | undefined) {
        if (image) {
            return (
                <Image
                    draggable={false}
                    src={image}
                    alt=""
                    width={300}
                    height={300}
                ></Image>
            )
        }
    }

    const link = (process.env.HOST_URL || '') + '/experience/' + experience.slug

    return (
        <div className="relative">
            <DeleteExperience slug={experience.slug} />
            <Link draggable={false} href={link} className="z-0">
                <div className="relative flex flex-1 flex-col items-center justify-center border-slate-200 border-2 rounded-xl p-4 h-[400px]">
                    <h1 className="md:text-xl font-bold">{experience.title}</h1>
                    <h3>{experience.date as string}</h3>
                    <div className="relative p-10">
                        {previewImage(experience.preview_image)}
                    </div>
                    <p>{experience.description}</p>
                </div>
            </Link>
        </div>
    )
}
