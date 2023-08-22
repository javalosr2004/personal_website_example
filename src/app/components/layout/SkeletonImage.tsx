'use client'

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'

type Props = {
    src: string
    alt: string
    width?: number
    height?: number
    props?: ImageProps
}

export default function SkeletonImage({
    src,
    alt,
    width,
    height,
    props,
}: Props) {
    const [loading, setLoading] = useState(true)
    return (
        <Image
            src={src}
            className={`${
                loading
                    ? 'animate-pulse bg-slate-300 opacity-50 w-[500px] h-[250px]'
                    : ''
            }`}
            width={width || 500}
            height={height || 500}
            alt={alt}
            {...props}
            onLoadingComplete={() => setLoading(false)}
        />
    )
}
