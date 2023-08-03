'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import style from './carousel.module.css'

export default function Carousel({
    images,
    path,
}: {
    images: string[]
    path?: string
}) {
    const [emblaRef] = useEmblaCarousel()

    return (
        <div className={style.embla} ref={emblaRef}>
            <div className={style.embla__container}>
                {images.map((image_url) => {
                    const complete_path: string = path
                        ? path + '/' + image_url
                        : image_url
                    return (
                        <div key={image_url} className={style.embla__slide}>
                            <Image
                                src={complete_path}
                                alt=""
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-full h-auto"
                            ></Image>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// image

{
    /* <ul className="flex flex-row ">
)}
</ul> */
}

// window resize code

// const [imageSize, setImageSize] = useState({
//     width: 500,
//     height: 500,
// })

// const handleResize = () => {
//     setImageSize({
//         width: window?.innerWidth,
//         height: window?.innerHeight,
//     })
// }

// useEffect(() => {
//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
// }, [])
