'use client'

import React from 'react'
// import Image from 'next/image'

import style from './css/carousel.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import './css/carousel_buttons.css'
import SkeletonImage from './SkeletonImage'

export default function Carousel({
    images,
    alt,
    path,
}: {
    images: string[]
    alt: string[]
    path?: string
}) {
    return (
        <Swiper
            navigation={true}
            modules={[Navigation]}
            className={`${style.swiper} mySwiper`}
        >
            {images.map((image_url, idx) => {
                const complete_path: string = path
                    ? path + '/' + image_url
                    : image_url
                return (
                    <SwiperSlide
                        className={`${style.swiper_slide}`}
                        key={image_url}
                    >
                        {/* <Image
                            src={complete_path}
                            alt={alt[idx] || ''}
                            width={500}
                            height={500}
                            sizes="100vw"
                            // style={{ objectFit: 'scale-down' }}
                            quality={100}
                        ></Image> */}
                        <SkeletonImage
                            src={complete_path}
                            alt={alt[idx] || ''}
                            width={500}
                            height={500}
                        ></SkeletonImage>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
    // return (
    //     <>
    //         <div className={style.embla}>
    //             <div className={style.embla__viewport} ref={emblaRef}>
    //                 <div className={style.embla__container}>
    //                     {images.map((image_url) => {
    //                         const complete_path: string = path
    //                             ? path + '/' + image_url
    //                             : image_url
    //                         return (
    //                             <div
    //                                 // onClick={handleImageClick}
    //                                 key={image_url}
    //                                 className={`${style.embla__slide} z-10`}
    //                             >
    //                                 <Image
    //                                     src={complete_path}
    //                                     alt=""
    //                                     fill={true}
    //                                     sizes="100vw"
    //                                     style={{ objectFit: 'scale-down' }}
    //                                     quality={100}
    //                                 ></Image>
    //                             </div>
    //                         )
    //                     })}
    //                 </div>
    //             </div>
    //             {/* <div className={style.embla__buttons}> */}
    //             <PrevButton
    //                 className={`${style.embla__button} absolute top-[50%] left-0`}
    //                 onClick={scrollPrev}
    //                 disabled={prevBtnDisabled}
    //             ></PrevButton>
    //             <NextButton
    //                 className={`${style.embla__button} absolute top-[50%] right-0`}
    //                 onClick={scrollNext}
    //                 disabled={nextBtnDisabled}
    //             ></NextButton>
    //             <h1 className="underline">{alt[currentIndex] || ''}</h1>
    //         </div>
    //     </>

    // )
}
