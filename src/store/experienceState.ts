import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export interface ExperienceState {
    slug: string
    title: string
    description: string
    date: dayjs.Dayjs | string
    preview_image: string
    detailed: {
        description: string
        images: string[]
        rootFolder?: string
        alt?: string[] | string
    }
}

const initialState: ExperienceState = {
    slug: '',
    title: '',
    date: dayjs('2023-08-14'),
    description: '',
    preview_image: '',
    detailed: {
        description: '',
        images: [],
        rootFolder: '',
        alt: '',
    },
}

export const experienceSlice = createSlice({
    name: 'experience',
    initialState,
    reducers: {
        setExperience: (state, action: PayloadAction<ExperienceState>) => {
            state.slug = action.payload.slug
            state.title = action.payload.title
            state.date = action.payload.date
            state.description = action.payload.description
            state.preview_image = action.payload.preview_image
            state.detailed = action.payload.detailed
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        setDate: (state, action: PayloadAction<dayjs.Dayjs | string>) => {
            state.date = action.payload
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        setPreviewImage: (state, action: PayloadAction<string>) => {
            state.preview_image = action.payload
        },
        setDetailedDescription: (state, action: PayloadAction<string>) => {
            state.detailed.description = action.payload
        },
        setDetailedImages: (state, action: PayloadAction<string[]>) => {
            state.detailed.images = action.payload
        },
        addDetailedImages: (state, action: PayloadAction<string>) => {
            state.detailed.images.push(action.payload)
        },
        setDetailedRootFolder: (state, action: PayloadAction<string>) => {
            state.detailed.rootFolder = action.payload
        },
        setDetailedAlt: (state, action: PayloadAction<string[] | string>) => {
            state.detailed.alt = action.payload
        },
        setSlug: (state, action: PayloadAction<string>) => {
            state.slug = action.payload
        },
    },
})

export const {
    setSlug,
    setExperience,
    setTitle,
    setDate,
    setDescription,
    setPreviewImage,
    addDetailedImages,
    setDetailedDescription,
    setDetailedImages,
    setDetailedRootFolder,
    setDetailedAlt,
} = experienceSlice.actions

export default experienceSlice.reducer
