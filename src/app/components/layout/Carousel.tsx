'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Carousel({
    images,
    path,
}: {
    images: string[]
    path?: string
}) {
    const [imageSize, setImageSize] = useState({
        width: 500,
        height: 500,
    })

    const handleResize = () => {
        setImageSize({
            width: window?.innerWidth,
            height: window?.innerHeight,
        })
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="border-black w-[500px] md:w-[500px] h-[500px] border-2 pointer-events-none relative inset-0 z-[3] rounded-[16px]">
            <h1>
                {imageSize.width} {imageSize.height}
            </h1>
            <div className="overflow-hidden">
                <div className="z-50 absolute inset-2 flex flex-row items-center justify-between px-4">
                    <span className="border-black border-2 w-[50px] h-[50px] rounded-full relative "></span>
                    <span className="border-black border-2 w-[50px] h-[50px] rounded-full relative "></span>
                </div>
                <ul className="flex flex-row ">
                    {images.map((image_url) => {
                        const complete_path: string = path
                            ? path + '/' + image_url
                            : image_url
                        return (
                            <li key={image_url} className="">
                                <Image
                                    src={complete_path}
                                    alt=""
                                    placeholder="empty"
                                    quality={100}
                                    fill={true}
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                ></Image>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
