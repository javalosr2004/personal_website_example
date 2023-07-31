'use client'

import React from 'react'
import Image from 'next/image'

export default function Carousel({ images }: { images: string[] }) {
    return (
        <div className="border-black border-2 w-[300px] h-[400px] relative">
            <div className="z-50 absolute inset-2 flex flex-row items-center justify-between">
                <span className="border-black border-2 w-[50px] h-[70px] relative "></span>
                <span className="border-black border-2 w-[50px] h-[70px] relative "></span>
            </div>

            <div className="flex flex-col h-full">
                {images.map((image_url) => {
                    return (
                        <Image
                            key={image_url}
                            src={image_url}
                            layout="fill"
                            objectFit="cover"
                            alt=""
                        ></Image>
                    )
                })}
            </div>
        </div>
    )
}
