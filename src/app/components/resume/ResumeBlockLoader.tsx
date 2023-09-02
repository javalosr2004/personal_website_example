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
            <div className="md:border-l md:border-neutral-200 md:pl-6 md:dark:border-zinc-700/40">
                <div className="grid max-w-3xl max-md:grid-rows-1 items-baseline gap-y-8 lg:grid-cols-2 ">
                    <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100  md:w-[20vw] w-[90%] max-md:border-b-neutral-200 max-md:border-b-2 max-md:border-spacing-2 ">
                        {topic}
                    </h2>
                    <div className="md:col-span-1">
                        <ul role="list" className="space-y-16">
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
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="md:border-l md:border-neutral-200 md:pl-6 md:dark:border-zinc-700/40">
            <div className="grid max-w-3xl max-md:grid-rows-1 items-baseline gap-y-8 lg:grid-cols-2 ">
                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100  md:w-[20vw] w-[90%] max-md:border-b-neutral-200 max-md:border-b-2 max-md:border-spacing-2 ">
                    {topic}
                </h2>
            </div>
        </div>
    )
}
