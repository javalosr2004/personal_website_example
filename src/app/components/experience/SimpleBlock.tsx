import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import DeleteExperience from './DeleteExperience'
import { ExperienceState } from '@/store/experienceState'
import { formatDate } from '../helpers/formatDate'

export default function SimpleBlock(experience: ExperienceState) {
    function previewImage(image: string | undefined) {
        if (image) {
            return (
                <Image
                    draggable={false}
                    src={image}
                    alt=""
                    // width={300}
                    // height={300}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                ></Image>
            )
        }
    }

    const link = (process.env.HOST_URL || '') + '/experience/' + experience.slug

    return (
        <div className="relative">
            <DeleteExperience slug={experience.slug} />
            <Link draggable={false} href={link} className="z-0">
                <div className="relative flex flex-1 flex-col items-center justify-center border-slate-200 border-2 rounded-xl p-4 xl:h-[500px] h-[400px]">
                    <h1 className="md:text-xl font-bold">{experience.title}</h1>
                    <h3>
                        {formatDate(experience.start_date, experience.end_date)}
                    </h3>
                    <div className="p-10">
                        <div className="relative p-10 xl:w-[400px] xl:h-[300px] w-[300px] h-[200px]">
                            {previewImage(experience.preview_image)}
                        </div>
                    </div>
                    <p>{experience.description}</p>
                </div>
            </Link>
        </div>
    )
}
