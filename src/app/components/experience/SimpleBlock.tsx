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
                    fill={true}
                    style={{ objectFit: 'cover' }}
                ></Image>
            )
        }
    }

    // (process.env.HOST_URL || '') + '/' experience/' + experience.slug
    const link = '/'
    return (
        <div className="relative">
            <div className="relative flex flex-1 flex-row pl-4 items-center ">
                <div className="relative w-[50px] h-[50px] border-zinc-200 border-4 rounded-full overflow-hidden">
                    {previewImage(experience.detailed.logo)}
                    <div className="absolute w-full h-full flex items-center justify-center">
                        <DeleteExperience
                            route="experience"
                            slug={experience.slug}
                        />
                    </div>
                </div>
                <Link draggable={false} href={link} className="z-0 w-[90%]">
                    <div className="ml-4 w-[90%]">
                        <h1 className="md:text-lg ">{experience.name}</h1>

                        <div className="flex flex-row w-[90%]">
                            <p className="font-light text-xs">
                                {experience.job_title}
                            </p>
                            <p className="font-light text-xs ml-auto">
                                {formatDate(
                                    experience.start_date,
                                    experience.end_date
                                )}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
