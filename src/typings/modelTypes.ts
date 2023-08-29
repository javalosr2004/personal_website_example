interface experienceType {
    slug: string
    name: string
    job_title?: string
    start_date: string
    end_date?: string
    logo: string
    detailed: {
        topic: 'work' | 'education' | 'projects' | 'skills'
        logo: string
        information: string[]
    }
}

export type { experienceType }
