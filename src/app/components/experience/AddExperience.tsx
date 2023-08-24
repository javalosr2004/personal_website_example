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
    setTitle,
    setStartDate,
    setEndDate,
    setDescription,
    setDetailedDescription,
    ExperienceState,
    setExperience,
    setDetailedAlt,
} from '@/store/experienceState'

import slugify from 'slugify'
import { useSelector } from 'react-redux'
import ImageUpload from '../cloudinary/ImageUpload'
import { RevalidateCache } from './RevalidateCache'
import { useRouter } from 'next/navigation'

/** TODO:
 *
 *      Add form validation using Zod and React-hook-form || implement custom validation???
 */

const firstStepSchema = z.object({
    title: z.string().min(2, 'Too Short!'),
    start_date: z.string().min(7, 'Date missing.'),
    end_date: z.string().optional(),
    preview_image: z.any(),
    description: z.string().min(3, 'Too Short!'),
})

const secondStepSchema = z.object({
    description: z.string(),
    images: z.array(z.string()),
    alt: z.string(),
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
            title: experience.title,
            start_date: experience.start_date,
            end_date: experience.end_date,
            preview_image: experience.preview_image,
            description: experience.description,
        },
    })

    function onSubmit(values: z.infer<typeof firstStepSchema>) {
        store.dispatch(setTitle(values.title))

        store.dispatch(setStartDate(values.start_date))
        if (values.end_date) {
            store.dispatch(setEndDate(values.end_date))
        }

        store.dispatch(setDescription(values.description))
        nextStep(setStep)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
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
                    name="preview_image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preview Image</FormLabel>
                            <FormControl>
                                <ImageUpload {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Optimized code."
                                    {...field}
                                />
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
    const form = useForm<z.infer<typeof secondStepSchema>>({
        resolver: zodResolver(secondStepSchema),
        defaultValues: {
            description: experience.detailed.description,
            images: experience.detailed.images,
            alt: experience.detailed.alt as string,
        },
    })

    function onSubmit(values: z.infer<typeof secondStepSchema>) {
        store.dispatch(setDetailedDescription(values.description))
        store.dispatch(setDetailedAlt(values.alt))
        handleSubmit()
    }

    const handlePrev = () => {
        const { description, alt } = form.getValues()
        store.dispatch(setDetailedDescription(description))
        store.dispatch(setDetailedAlt(alt))
        previousStep(setStep)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="I worked with ..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slideshow Images</FormLabel>
                            <FormControl>
                                <ImageUpload multiple={true} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="alt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alt Captions</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row text-center w-full justify-around">
                    <Button
                        className="w-[150px]"
                        type="button"
                        onClick={handlePrev}
                    >
                        Prev
                    </Button>
                    <Button className="w-[150px]" type="submit">
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
    title: '',
    start_date: '',
    end_date: '',
    description: '',
    preview_image: '',
    detailed: {
        description: '',
        images: [],
        alt: '',
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
                const slug: string = slugify(experience.title, {
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
                }
            }
        }

        await RevalidateCache(router)
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

                <DialogContent className="sm:max-w-[500px]">
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
