import React, { Suspense } from 'react'
import Carousel from './components/layout/Carousel'
import Image from 'next/image'

export default function HomePage() {
    return (
        <div className={`flex flex-col w-[90vw] xl:w-[100vw]`}>
            <h1 className="mt-3 text-2xl md:text-3xl ">
                Hi, I am <b>Jesus Avalos.</b>
            </h1>
            <div className="w-full flex flex-row">
                <div className="relative overflow-hidden border-black border-2 w-[200px] h-[200px] rounded-[50%] my-4">
                    <Suspense fallback={'Loading...'}>
                        <Image
                            src={'/avatar.jpg'}
                            alt="Picture of Jesus Avalos"
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            draggable={false}
                        ></Image>
                    </Suspense>
                </div>
                <div className="pt-4"></div>
            </div>
            <h1 className="mt-10 underline underline-offset-1">Past Work:</h1>
            <div className="flex flex-1 flex-col items-center justify-center">
                <h1 className="mt-5 md:text-xl font-bold">
                    Hospice of SLO Website
                </h1>
                <div className="relative mt-8 w-full h-auto md:max-w-[67rem] p-4 ">
                    <Suspense fallback={'loading...'}>
                        <Carousel
                            images={[
                                'discussion_1.png',
                                'select_2.png',
                                'signup_1.png',
                                'complete_signup_1.png',
                                'delete_shift_1.png',
                            ]}
                            alt={[
                                'Discussion',
                                'Selection',
                                'Signup Form',
                                'Completed Signup',
                                'Delete Shift',
                            ]}
                            path="/hospice_of_slo"
                        ></Carousel>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
