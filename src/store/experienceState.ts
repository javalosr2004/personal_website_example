import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export interface ExperienceState {
    slug: string
    name: string
    job_title: string | undefined
    start_date: string
    end_date: string

    detailed: {
        topic: 'work' | 'education' | 'projects' | 'skills'
        logo: string
        information: string[]
    }
}

const initialState: ExperienceState = {
    slug: '',
    name: '',
    start_date: dayjs().format('YYYY-MM-DD'),
    end_date: '',
    job_title: undefined,
    detailed: {
        topic: 'education',
        logo: '',
        information: [],
    },
}

export const experienceSlice = createSlice({
    name: 'experience',
    initialState,
    reducers: {
        setExperience: (state, action: PayloadAction<ExperienceState>) => {
            state.slug = action.payload.slug
            state.name = action.payload.name
            state.start_date = action.payload.start_date
            state.end_date = action.payload.end_date
            state.job_title = action.payload.job_title
            state.detailed = action.payload.detailed
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setStartDate: (state, action: PayloadAction<string>) => {
            state.start_date = action.payload
        },
        setEndDate: (state, action: PayloadAction<string>) => {
            state.start_date = action.payload
        },
        setJobTitle: (state, action: PayloadAction<string | undefined>) => {
            state.job_title = action.payload
        },
        setLogo: (state, action: PayloadAction<string>) => {
            state.detailed.logo = action.payload
        },
        setDetailedTopic: (
            state,
            action: PayloadAction<'work' | 'education' | 'skills' | 'projects'>
        ) => {
            state.detailed.topic = action.payload
        },
        setDetailedInformation: (state, action: PayloadAction<string[]>) => {
            state.detailed.information = action.payload
        },
        addDetailedInformation: (state, action: PayloadAction<string>) => {
            state.detailed.information.push(action.payload)
        },
        setSlug: (state, action: PayloadAction<string>) => {
            state.slug = action.payload
        },
    },
})

export const {
    setSlug,
    setExperience,
    setStartDate,
    setEndDate,
    setJobTitle,
    setName,
    setLogo,
    setDetailedTopic,
    setDetailedInformation,
    addDetailedInformation,
} = experienceSlice.actions

export default experienceSlice.reducer
