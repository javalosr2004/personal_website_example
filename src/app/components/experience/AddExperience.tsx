'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { RootState, store } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// import all dispath actions from store for experience, setDate, setExperience
import {
    setSlug,
    setName,
    setStartDate,
    setEndDate,
    setJobTitle,
    setDetailedTopic,
    setExperience,
    ExperienceState,
} from '@/store/experienceState'

import slugify from 'slugify'
import { useSelector } from 'react-redux'
import ImageUpload from '../cloudinary/ImageUpload'
import { RevalidateCache } from './RevalidateCache'
import { useRouter } from 'next/navigation'
import ArrayInput from '../resume/ArrayInput'
import dayjs from 'dayjs'

/** TODO:
 *
 *      Add form validation using Zod and React-hook-form || implement custom validation???
 */

const firstStepSchema = z.object({
    company_name: z.string().min(2, 'Too Short!'),
    job_title: z.string().optional(),
    start_date: z.string().min(7, 'Date missing.'),
    end_date: z.string().optional(),
})

const secondStepSchema = z.object({
    topic: z.string().min(3, 'Pick an option!'),
    logo: z.string(),
})

export const previousStep = (
    setStep: React.Dispatch<React.SetStateAction<number>>
) => {
    setStep((step) => step - 1)
}

export const nextStep = (
    setStep: React.Dispatch<React.SetStateAction<number>>
) => {
    setStep((step) => step + 1)
}

/** TODO:
 *
 *      Maintain state when close button is clicked
 */

const FirstDialog = ({
    experience,
    setStep,
}: {
    experience: ExperienceState
    setStep: React.Dispatch<React.SetStateAction<number>>
}) => {
    const form = useForm<z.infer<typeof firstStepSchema>>({
        resolver: zodResolver(firstStepSchema),
        defaultValues: {
            company_name: experience.name,
            start_date: experience.start_date,
            end_date: experience.end_date,
            job_title: experience.job_title,
        },
    })

    function onSubmit(values: z.infer<typeof firstStepSchema>) {
        store.dispatch(setName(values.company_name))

        store.dispatch(setStartDate(values.start_date))
        if (values.end_date) {
            store.dispatch(setEndDate(values.end_date))
        }

        store.dispatch(setJobTitle(values.job_title))
        nextStep(setStep)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
                <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Google" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="job_title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    {...field}
                                    placeholder="Software Engineer"
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Continue</Button>
            </form>
        </Form>
    )
}

const SecondDialog = ({
    experience,
    setStep,
    handleSubmit,
}: {
    experience: ExperienceState
    setStep: React.Dispatch<React.SetStateAction<number>>
    handleSubmit: () => void
}) => {
    const [uploading, setUpload] = useState(false)
    const form = useForm<z.infer<typeof secondStepSchema>>({
        resolver: zodResolver(secondStepSchema),
        defaultValues: {
            topic: experience.detailed.topic,
            logo: experience.detailed.logo,
        },
    })

    function onSubmit() {
        setUpload(true)
        handleSubmit()
    }

    const handlePrev = () => {
        handleChange()
        previousStep(setStep)
    }

    const handleChange = () => {
        const { topic } = form.getValues()
        store.dispatch(
            setDetailedTopic(
                topic as 'work' | 'skills' | 'projects' | 'education'
            )
        )
    }

    return (
        <Form {...form}>
            <form
                onChange={handleChange}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 "
            >
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Topic</FormLabel>
                            <br />
                            <FormControl>
                                <select
                                    className="border-[1px] rounded-md w-full h-10 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                                    {...field}
                                >
                                    <option value="work">Work</option>
                                    <option value="education">Education</option>
                                    <option value="projects">Projects</option>
                                    <option value="skills">Skills</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logo</FormLabel>
                            <FormControl>
                                <ImageUpload {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <FormItem>
                        <FormLabel>Information</FormLabel>
                        <FormControl>
                            <ArrayInput></ArrayInput>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </div>
                <div className="flex flex-row text-center w-full justify-around">
                    <Button
                        className="w-[150px]"
                        type="button"
                        onClick={handlePrev}
                    >
                        Prev
                    </Button>
                    <Button
                        disabled={uploading}
                        className="w-[150px]"
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    )
}

const MultipleStepForm = ({
    experience,
    handleSubmit,
    step,
    setStep,
}: {
    experience: ExperienceState
    handleSubmit: () => void
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
}) => {
    switch (step) {
        case 0:
            return <FirstDialog experience={experience} setStep={setStep} />
        case 1:
            return (
                <SecondDialog
                    experience={experience}
                    setStep={setStep}
                    handleSubmit={handleSubmit}
                />
            )
        default:
            return <FirstDialog experience={experience} setStep={setStep} />
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

export default function AddExperience() {
    const experience: ExperienceState = useSelector<RootState, ExperienceState>(
        (state) => state.experience
    )
    const [step, setStep] = useState(0)

    const router = useRouter()

    useEffect(() => {
        store.dispatch(setExperience(initialState))
    }, [])

    const closeButton = useRef<HTMLButtonElement>(null)

    // TODO: Add Authorization using Bearer Token

    const handleSubmit = async () => {
        console.log('submit')
        if (window) {
            if (experience) {
                const slug: string = slugify(experience.name, {
                    replacement: '_',
                    lower: true,
                })
                store.dispatch(setSlug(slug))

                const POST_REQUEST = '/api/db/experiences' + `/${slug}`
                const res = await fetch(POST_REQUEST, {
                    method: 'POST',
                    body: JSON.stringify({
                        ...experience,
                    }),
                })
                if (!res.ok) {
                    console.log('error')
                } else {
                    await RevalidateCache(router)
                }
            }
        }

        if (closeButton.current) {
            closeButton.current.click()
        }
    }

    return (
        <div className="w-200px mt-5">
            <button></button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'outline'}>Add Experience</Button>
                </DialogTrigger>
                {/* sm:max-w-[500px] */}
                <DialogContent className=" lg:max-w-screen-lg overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Add Experience</DialogTitle>
                        <DialogDescription>
                            Add a new work or personal experience! Feel free to
                            be detailed.
                        </DialogDescription>
                    </DialogHeader>
                    <MultipleStepForm
                        experience={experience}
                        handleSubmit={handleSubmit}
                        step={step}
                        setStep={setStep}
                    />
                    <DialogFooter>
                        <DialogTrigger
                            ref={closeButton}
                            className="hidden"
                        ></DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
