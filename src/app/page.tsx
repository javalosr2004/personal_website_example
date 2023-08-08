import React, { Suspense } from 'react'
import Carousel from './components/layout/Carousel'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default async function HomePage() {
    const { status } = useSession()
    const handleClick = () => {
        if (status === 'authenticated') {
            signIn('github')
        } else {
            signOut()
        }
    }

    return (
        <div className={`flex flex-col w-[90vw] xl:w-[100vw]`}>
            <div className="xl:max-w-5xl lg:max-w-4xl  mb-10 flex flex-row self-center">
                <div className="mr-10 flex flex-col justify-around my-10">
                    <h1 className="mt-4 text-2xl md:text-4xl">
                        <b>
                            Developer.
                            <br /> Student. Husband. <br />
                            {status === 'authenticated' && (
                                <b>Now Signed In.</b>
                            )}
                        </b>
                    </h1>
                    <h2 className="mt-8 lg:mt-0 md:text-xl">
                        Hi, I'm <b>Jesus Avalos</b>, I am sophmore studying
                        Computer Science at Cal Poly - San Luis Obispo
                        <span className="text-xl"> 🐎</span>
                    </h2>
                </div>
                <div className="flex flex-row md:ml-24">
                    <div
                        onClick={handleClick}
                        className={`${
                            status === 'authenticated'
                                ? 'border-green-300'
                                : 'border-black'
                        } relative overflow-hiddenborder-2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-[50%] my-4`}
                    >
                        <Image
                            src={'/avatar.jpg'}
                            alt="Picture of Jesus Avalos"
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            draggable={false}
                        ></Image>
                    </div>
                    <div className="pt-4"></div>
                </div>
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
