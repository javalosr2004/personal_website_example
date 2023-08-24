import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export interface ExperienceState {
    slug: string
    title: string
    description: string
    start_date: string
    end_date: string
    preview_image: string
    detailed: {
        description: string
        images: string[]
        alt: string | string[]
    }
}

const initialState: ExperienceState = {
    slug: '',
    title: '',
    start_date: dayjs().format('YYYY-MM-DD'),
    end_date: '',
    description: '',
    preview_image: '',
    detailed: {
        description: '',
        images: [],
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
            state.start_date = action.payload.start_date
            state.end_date = action.payload.end_date
            state.description = action.payload.description
            state.preview_image = action.payload.preview_image
            state.detailed = action.payload.detailed
        },
        setFirstStep: (state, action: PayloadAction<ExperienceState>) => {
            state.title = action.payload.title
            state.start_date = action.payload.start_date
            state.end_date = action.payload.end_date
            state.description = action.payload.description
            state.preview_image = action.payload.preview_image
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        setStartDate: (state, action: PayloadAction<string>) => {
            state.start_date = action.payload
        },
        setEndDate: (state, action: PayloadAction<string>) => {
            state.start_date = action.payload
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
        addDetailedAlt: (state, action: PayloadAction<string>) => {
            // TODO: add alt to detailed images with array
            state.detailed.alt = action.payload
        },
        setDetailedAlt: (state, action: PayloadAction<string>) => {
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
    setFirstStep,
    setTitle,
    setStartDate,
    setEndDate,
    setDescription,
    setPreviewImage,
    addDetailedImages,
    setDetailedDescription,
    setDetailedImages,
    addDetailedAlt,
    setDetailedAlt,
} = experienceSlice.actions

export default experienceSlice.reducer
