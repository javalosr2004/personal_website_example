import { ResumeType } from '@/typings/resumeTypes'
import React from 'react'

export default function ResumeBlock({ title, information }: ResumeType) {
    return (
        <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <ul>
                {information.map((info, index) => {
                    return <li key={index}>{info}</li>
                })}
            </ul>
        </div>
    )
}
