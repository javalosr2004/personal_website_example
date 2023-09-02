import React from 'react'
import ImageSignIn from './components/signin/ImageSignIn'
import AdminControls from './components/experience/AdminControls'
import { SimpleBlockLoader } from './components/experience/SimpleBlockLoader'
import SimpleBlogLoader from './components/blog/SimpleBlogLoader'

export default async function HomePage() {
    return (
        <div className={`flex flex-col lg:w-[90vw] justify-center mb-[10%]`}>
            <div className="max-w-4xl mb-10 flex flex-row self-center">
                <div className="mr-10 flex flex-col justify-around my-10">
                    <h1 className="mt-4 text-2xl md:text-4xl">
                        <b>
                            Developer.
                            <br /> Student. Husband. <br />
                        </b>
                    </h1>
                    <h2 className="mt-8 lg:mt-0 md:text-xl">
                        Hi, I'm <b>Jesus Avalos</b>, I am sophmore studying
                        Computer Science at Cal Poly - San Luis Obispo
                        <span className="text-xl"> 🐎</span>
                        <div>
                            <br />

                            <div className="lg:mb-0 mb-10">
                                <AdminControls />
                            </div>
                        </div>
                    </h2>
                </div>
                <div className="flex flex-row md:ml-24">
                    <ImageSignIn></ImageSignIn>
                </div>
            </div>
            <div className="sm:px-8 mt-5  md:mt-20">
                <div className="mx-auto max-w-7xl lg:px-8">
                    <div className="relative px-4 sm:px-8 lg:px-12">
                        <div className="mx-auto max-w-2xl lg:max-w-5xl">
                            <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                                <SimpleBlogLoader></SimpleBlogLoader>
                                <SimpleBlockLoader></SimpleBlockLoader>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
