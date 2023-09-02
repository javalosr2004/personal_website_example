import { ResumeType } from '@/typings/resumeTypes'
import dayjs from 'dayjs'
import React from 'react'

export default function ResumeBlock({
    title,
    information,
    start,
    end,
}: ResumeType) {
    return (
        <div className="md:col-span-3 ">
            <ul role="list" className="space-y-16">
                <li className="group relative flex flex-col items-start">
                    <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                        {title}
                    </h2>
                    <div className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <p className="text-xs font-light -mt-1">
                            {dayjs(start).format('MMM YYYY') +
                                ' - ' +
                                (end !== ''
                                    ? dayjs(end).format('MMM YYYY')
                                    : 'Present')}
                        </p>

                        <ul className="mt-1 ml-3 list-disc">
                            {information.map((info, index) => {
                                return (
                                    <li>
                                        <span
                                            key={index}
                                            className="font-semibold"
                                        >
                                            {info}
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
    return (
        <div className="group relative flex flex-col items-start">
            <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 ml-10 max-md:mb-5 w-[20vw] inline">
                {title}
            </h2>
            <ul className="list-disc m-2 p-4">
                {information.map((info, index) => {
                    return <li key={index}>{info}</li>
                })}
            </ul>
        </div>
    )
}
