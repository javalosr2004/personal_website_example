'use client'

import React, { useState } from 'react'
import Image from 'next/image'

type Props = {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    objectFit?: 'cover' | 'contain' | 'scale-down' | 'none'
}

export default function SkeletonImage({
    src,
    alt,
    width,
    height,
    fill,
    objectFit,
}: Props) {
    const [loading, setLoading] = useState(true)
    if (fill) {
        return (
            <Image
                src={src}
                className={`${
                    loading
                        ? 'animate-pulse bg-slate-300 opacity-50 w-[500px] h-[250px]'
                        : ''
                }`}
                fill={fill}
                style={{ objectFit: objectFit || 'cover' }}
                alt={alt}
                onLoadingComplete={() => setLoading(false)}
            />
        )
    }
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
            onLoadingComplete={() => setLoading(false)}
        />
    )
}
