import { ResumeBroadType } from '@/typings/resumeTypes'
import React from 'react'
import ResumeBlock from './ResumeBlock'

export default function ResumeBlockLoader({
    topic,
    topic_data,
}: ResumeBroadType) {
    return (
        <div className="flex flex-col md:flex-row md:border-l-2 md:border-black">
            <h2 className="text-2xl font-bold max-md:mb-5">{topic}</h2>
            <div className="flex flex-col gap-y-5">
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
