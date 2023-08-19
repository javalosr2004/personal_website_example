'use client'
import React, { useEffect, useRef, useState } from 'react'
import style from './experience.module.css'
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
import { Label } from '@/components/ui/label'

import { RootState, store } from '@/store'
// import all dispath actions from store for experience, setDate, setExperience
import {
    setSlug,
    setTitle,
    setDescription,
    setDetailedDescription,
    setDetailedRootFolder,
    setDetailedImages,
    setDetailedAlt,
    ExperienceState,
} from '@/store/experienceState'

import slugify from 'slugify'
// import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

/** TODO:
 *
 *      Add form validation using Zod and React-hook-form || implement custom validation???
 */

// const formSchema = z.object({
//     title: z.string(),
//     date: z.date(),
//     preview_image: z.string(),
//     detailed_description: z.string(),
//     carousel_images: z.string().regex(RegExp('"([^"]*)"')),
//     alt: z.string({}).regex(RegExp('"([^"]*)"')).optional().or(z.literal('')),
//     root_folder: z.string({}).optional().or(z.literal('')),
// })

export const previousStep = (
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
) => {
    if (step - 1 >= 0) {
        setStep((step) => step - 1)
    }
}
export const nextStep = (
    setStep: React.Dispatch<React.SetStateAction<number>>
) => {
    setStep((step) => step + 1)
}

const FirstDialog = ({ experience }: { experience: ExperienceState }) => {
    const [files, setFiles] = useState<FileList | null>(null)
    useEffect(() => {
        console.log(files)
    }, [files])

    return (
        <div className="grid gap-4 py-4">
            <div className={style.form_group}>
                <Label htmlFor="title" className="text-right">
                    Title
                </Label>
                <Input
                    id="title"
                    value={experience.title}
                    onChange={(event) =>
                        store.dispatch(setTitle(event.currentTarget.value))
                    }
                    placeholder="Google"
                />
            </div>
            <div className={style.form_group}>
                {/* <DatePicker
                    className=" w-[280px]"
                    label="Calendar"
                    value={experience.date}
                    onChange={(value) =>
                        store.dispatch(setDate(value as dayjs.Dayjs))
                    }
                ></DatePicker> */}
            </div>
            <div className={style.form_group}>
                <Label htmlFor="preview_image" className="text-right">
                    Preview Image
                </Label>
                {/* <Input
                    id="preview_image"
                    value={experience.preview_image}
                    onChange={(event) =>
                        store.dispatch(
                            setPreviewImage(event.currentTarget.value)
                        )
                    }
                    placeholder="Optimized code."
                /> */}
                <Input
                    multiple={true}
                    onChange={(event) => {
                        setFiles(event.currentTarget.files)
                    }}
                    type="file"
                    placeholder="Upload file."
                ></Input>
            </div>
            <div className={style.form_group}>
                <Label htmlFor="simple_description" className="text-right">
                    Simple Description
                </Label>
                <Input
                    id="description"
                    value={experience.description}
                    onChange={(event) =>
                        store.dispatch(
                            setDescription(event.currentTarget.value)
                        )
                    }
                    placeholder="Optimized code."
                />
            </div>
        </div>
    )
}

const SecondDialog = ({ experience }: { experience: ExperienceState }) => {
    return (
        <div className="grid gap-4 py-4">
            <div className={style.form_group_larger}>
                <Label htmlFor="description" className="text-right">
                    Description
                </Label>
                <Input
                    id="description"
                    value={experience.detailed.description}
                    onChange={(event) =>
                        store.dispatch(
                            setDetailedDescription(event.currentTarget.value)
                        )
                    }
                    placeholder="Google"
                />
            </div>
            <div className={style.form_group_larger}>
                <Label htmlFor="root_folder" className="text-right">
                    Root Folder (optional)
                </Label>
                <Input
                    id="root_folder"
                    value={experience.detailed.rootFolder}
                    onChange={(event) =>
                        setDetailedRootFolder(event.currentTarget.value)
                    }
                    placeholder="/rose_pictures"
                />
            </div>
            <div className={style.form_group_larger}>
                <Label htmlFor="images" className="text-right">
                    Slideshow Images
                </Label>
                <Input
                    id="images"
                    value={experience.detailed.images}
                    onChange={(event) =>
                        store.dispatch(
                            setDetailedImages(event.currentTarget.value)
                        )
                    }
                    placeholder="['rose_1.png', 'rose_2.png']"
                />
            </div>
            <div className={style.form_group_larger}>
                <Label htmlFor="alt" className="text-right">
                    Alt Captions
                </Label>
                <Input
                    id="alt"
                    value={experience.detailed.alt}
                    onChange={(event) =>
                        store.dispatch(
                            setDetailedAlt(event.currentTarget.value)
                        )
                    }
                    placeholder="['Cool picture', 'Nice dog']"
                />
            </div>
        </div>
    )
}

const MultipleStepForm = ({
    step,
    experience,
}: {
    step: number
    experience: ExperienceState
}) => {
    switch (step) {
        case 0:
            return <FirstDialog experience={experience} />
        case 1:
            return <SecondDialog experience={experience} />
        default:
            return <FirstDialog experience={experience} />
    }
}

export default function AddExperience() {
    const experience: ExperienceState = useSelector<RootState, ExperienceState>(
        (state) => state.experience
    )

    const [disabled, setDisabled] = useState(false)
    const [step, setStep] = useState(0)
    const closeButton = useRef<HTMLButtonElement>(null)

    // TODO: Add Authorization using Bearer Token

    const handleSubmit = async () => {
        console.log('submit')
        if (window) {
            // const sessionForm = window.sessionStorage.getItem('form')
            if (experience) {
                const slug: string = slugify(experience.title, {
                    replacement: '_',
                    lower: true,
                })
                store.dispatch(setSlug(slug))

                // const date = `${new Date(
                //     formData.date?.from || new Date()
                // ).toLocaleDateString('en-us', {
                //     year: 'numeric',
                //     month: 'short',
                // })} - ${new Date(
                //     formData.date?.to || new Date()
                // ).toLocaleDateString('en-us', {
                //     year: 'numeric',
                //     month: 'short',
                // })}`

                // const preview = experience.preview_image

                const POST_REQUEST = '/api/db/experiences' + `/${slug}`
                setDisabled(true)
                const res = await fetch(POST_REQUEST, {
                    method: 'POST',
                    body: JSON.stringify({
                        ...experience,
                        // preview_image: preview,
                        // date,
                    }),
                })
                if (!res.ok) {
                    console.log('error')
                }
            }
        }
        setDisabled(false)
        if (closeButton.current) {
            closeButton.current.click()
        }
    }

    // TODO: Remove this session storage and use primarily redux store instead
    useEffect(() => {
        window.sessionStorage.setItem('form', JSON.stringify(experience))
    }, [experience])

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
                    <MultipleStepForm step={step} experience={experience} />
                    <DialogFooter>
                        {step - 1 >= 0 && (
                            <Button
                                onClick={() => previousStep(step, setStep)}
                                variant={'secondary'}
                            >
                                Previous
                            </Button>
                        )}
                        {step >= 0 && step + 1 < 2 && (
                            <Button
                                onClick={() => nextStep(setStep)}
                                variant={'secondary'}
                            >
                                Continue
                            </Button>
                        )}
                        {step == 1 && (
                            <Button disabled={disabled} onClick={handleSubmit}>
                                Submit
                            </Button>
                        )}
                        <DialogTrigger>
                            <Button
                                ref={closeButton}
                                className="hidden"
                            ></Button>
                        </DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
