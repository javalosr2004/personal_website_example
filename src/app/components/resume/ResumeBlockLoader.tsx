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
            <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                <div className="grid max-w-3xl grid-cols-3 items-baseline gap-y-8 md:grid-cols-4">
                    <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 ml-10 max-md:mb-5 w-[20vw] ">
                        {topic}
                    </h2>

                    {topic_data.map((data, index) => {
                        return (
                            <ResumeBlock
                                title={data.title}
                                information={data.information}
                                start={data.start}
                                end={data.end}
                                key={index}
                            ></ResumeBlock>
                        )
                    })}
                </div>
            </div>
        )
    }
    return (
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 ml-10 max-md:mb-5 w-[20vw] ">
                    {topic}
                </h2>
            </div>
        </div>
    )
}
