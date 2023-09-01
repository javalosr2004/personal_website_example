import { ResumeBroadType } from '@/typings/resumeTypes'
import React from 'react'
import ResumeBlock from './ResumeBlock'

export default function ResumeBlockLoader({
    topic,
    topic_data,
}: ResumeBroadType) {
    if (
        topic_data.length !== 0 &&
        topic_data[0].title &&
        topic_data[0].information
    ) {
        return (
            <div className="flex flex-col mt-10 md:flex-row md:border-l-2 md:border-black text-left w-[50vw]">
                <h2 className="text-2xl font-bold ml-10 max-md:mb-5 w-[20vw] ">
                    {topic}
                </h2>
                <div className="flex flex-col gap-y-5 w-full">
                    {topic_data.map((data, index) => {
                        return (
                            <ResumeBlock
                                title={data.title}
                                information={data.information}
                                key={index}
                            ></ResumeBlock>
                        )
                    })}
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col mt-10 md:flex-row md:border-l-2 md:border-black text-left w-[50vw]">
            <h2 className="text-2xl font-bold max-md:mb-5 ml-10">{topic}</h2>
            <div className="flex flex-col gap-y-5"></div>
        </div>
    )
}
