import { ResumeType } from '@/typings/resumeTypes'
import dayjs from 'dayjs'
import React from 'react'

// TODO: add a way to link up homepage to resume
export default function ResumeBlock({
    title,
    information,
    start,
    end,
}: ResumeType) {
    return (
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

                <ul className="mt-2 ml-3 list-disc flex flex-col gap-y-2">
                    {information.map((info, index) => {
                        return (
                            <li>
                                <span key={index}>{info}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </li>
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
