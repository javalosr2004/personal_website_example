interface ResumeType {
    title: string
    information: string[]
    start?: string
    end?: string
}

type ResumeBroadType = {
    topic: string
    topic_data: ResumeType[]
}

export type { ResumeType, ResumeBroadType }
