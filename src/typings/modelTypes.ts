interface experienceType {
    slug: string
    title: string
    description: string
    date: string
    preview_image: string
    detailed: {
        description: string
        images: string[]
        rootFolder?: string
        alt?: string[]
    }
}

export type { experienceType }
