'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { PrevButton, NextButton } from './emblaButtons'
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react'
import Image from 'next/image'
import style from './carousel.module.css'

export default function Carousel({
    images,
    alt,
    path,
}: {
    images: string[]
    alt: string[]
    path?: string
}) {
    const [emblaRef, emblaAPI] = useEmblaCarousel({
        containScroll: 'trimSnaps',
    })
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)

    // you can use one liners, if you want
    const scrollPrev = useCallback(() => {
        if (!emblaAPI) return
        requestAnimationFrame(() => {
            emblaAPI.scrollPrev()
        })
    }, [emblaAPI])

    const scrollNext = useCallback(() => {
        if (!emblaAPI) return
        requestAnimationFrame(() => {
            emblaAPI.scrollNext()
        })
    }, [emblaAPI])

    const handleSelect = (emblaAPI: EmblaCarouselType) => {
        if (!emblaAPI) return
        setNextBtnDisabled(!emblaAPI.canScrollNext())
        setPrevBtnDisabled(!emblaAPI.canScrollPrev())
        setCurrentIndex(emblaAPI.selectedScrollSnap())
    }

    // const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //     // e.currentTarget.classList.add('scale-[200%]')
    //     // The coordinates relative to the viewport
    // }

    useEffect(() => {
        if (!emblaAPI) return
        handleSelect(emblaAPI)
        emblaAPI?.on('select', handleSelect)
    }, [emblaAPI])

    return (
        <>
            <div className={style.embla} autoFocus={false}>
                <div className={style.embla__viewport} ref={emblaRef}>
                    <div className={style.embla__container}>
                        {images.map((image_url) => {
                            const complete_path: string = path
                                ? path + '/' + image_url
                                : image_url
                            return (
                                <div
                                    // onClick={handleImageClick}
                                    key={image_url}
                                    className={`${style.embla__slide} z-10`}
                                >
                                    <Image
                                        src={complete_path}
                                        alt=""
                                        fill={true}
                                        sizes="100vw"
                                        style={{ objectFit: 'scale-down' }}
                                        quality={100}
                                    ></Image>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* <div className={style.embla__buttons}> */}
                <PrevButton
                    className={`${style.embla__button} absolute top-[50%] left-0`}
                    onClick={scrollPrev}
                    disabled={prevBtnDisabled}
                ></PrevButton>
                <NextButton
                    className={`${style.embla__button} absolute top-[50%] right-0`}
                    onClick={scrollNext}
                    disabled={nextBtnDisabled}
                ></NextButton>
                <h1>{alt[currentIndex] || ''}</h1>
            </div>
        </>
    )
}
