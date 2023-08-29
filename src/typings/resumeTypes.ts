interface ResumeType {
    title: string
    information: string[]
}

type ResumeBroadType = {
    topic: string
    topic_data: ResumeType[]
}

export type { ResumeType, ResumeBroadType }
