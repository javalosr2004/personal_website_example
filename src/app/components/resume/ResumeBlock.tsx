import { ResumeType } from '@/typings/resumeTypes'
import React from 'react'

export default function ResumeBlock({ title, information }: ResumeType) {
    return (
        <div className="text-left">
            <h2 className="text-2xl font-bold inline text-">{title}</h2>
            <ul className="list-disc m-2 p-4">
                {information.map((info, index) => {
                    return <li key={index}>{info}</li>
                })}
            </ul>
        </div>
    )
}
