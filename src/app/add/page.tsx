'use client'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import style from './experience.module.css'
import reducer from './sessionReducer/reducer'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'

import { DatePicker } from '@mui/x-date-pickers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { State, Action } from './sessionReducer/typings'
import slugify from 'slugify'
import dayjs from 'dayjs'

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

const FirstDialog = ({
    state,
    dispatch,
}: {
    state: State
    dispatch: React.Dispatch<Action>
}) => {
    return (
        <div className="grid gap-4 py-4">
            <div className={style.form_group}>
                <Label htmlFor="title" className="text-right">
                    Title
                </Label>
                <Input
                    id="title"
                    value={state.title}
                    onChange={(event) =>
                        dispatch({
                            type: 'set-title',
                            payload: event.currentTarget.value,
                        })
                    }
                    placeholder="Google"
                />
            </div>
            <div className={style.form_group}>
                <DatePicker
                    className=" w-[280px]"
                    label="Calendar"
                    value={state.date}
                    onChange={(value) =>
                        dispatch({
                            type: 'set-date',
                            payload: value,
                        })
                    }
                ></DatePicker>
            </div>
            <div className={style.form_group}>
                <Label htmlFor="preview_image" className="text-right">
                    Preview Image
                </Label>
                <Input
                    id="preview_image"
                    value={state.preview_image}
                    onChange={(event) =>
                        dispatch({
                            type: 'set-preview-image',
                            payload: event.currentTarget.value,
                        })
                    }
                    placeholder="Optimized code."
                />
            </div>
            <div className={style.form_group}>
                <Label htmlFor="simple_description" className="text-right">
                    Simple Description
                </Label>
                <Input
                    id="description"
                    value={state.simple_description}
                    onChange={(event) =>
                        dispatch({
                            type: 'set-simple-description',
                            payload: event.currentTarget.value,
                        })
                    }
                    placeholder="Optimized code."
                />
            </div>
        </div>
    )
}

const SecondDialog = ({
    state,
    dispatch,
}: {
    state: State
    dispatch: React.Dispatch<Action>
}) => {
    return (
        <div className="grid gap-4 py-4">
            <div className={style.form_group_larger}>
                <Label htmlFor="description" className="text-right">
                    Description
                </Label>
                <Input
                    id="description"
                    value={state.detailed_description}
                    onChange={(event) =>
                        dispatch({
                            type: 'set-detailed-description',
                            payload: event.currentTarget.value,
                        })
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
                    value={state.root_folder}
                    onChange={(event) =>
                        dispatch({
                            type: 'set-root-folder',
                            payload: event.currentTarget.value,
                        })
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
                    value={state.carousel_images}
                    onChange={(event) =>
                        dispatch({
                            type: 'set-carousel-images',
                            payload: event.currentTarget.value,
                        })
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
                    value={state.alt}
                    onChange={(event) =>
                        dispatch({
                            type: 'set-alt',
                            payload: event.currentTarget.value,
                        })
                    }
                    placeholder="['Cool picture', 'Nice dog']"
                />
            </div>
        </div>
    )
}

const MultipleStepForm = ({
    step,
    state,
    dispatch,
}: {
    step: number
    state: State
    dispatch: React.Dispatch<Action>
}) => {
    switch (step) {
        case 0:
            return <FirstDialog state={state} dispatch={dispatch} />
        case 1:
            return <SecondDialog state={state} dispatch={dispatch} />
        default:
            return <FirstDialog state={state} dispatch={dispatch} />
    }
}

export default function AddExperience() {
    const initialState = {
        step: 0,
        title: '',
        date: dayjs('2023-08-14'),
        simple_description: '',
        preview_image: '',
        detailed_description: '',
        carousel_images: '',
        alt: '',
        root_folder: '',
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const [disabled, setDisabled] = useState(false)
    const closeButton = useRef<HTMLButtonElement>(null)

    // TODO: Add Authorization using Bearer Token

    const handleSubmit = async () => {
        console.log('submit')
        if (window) {
            const sessionForm = window.sessionStorage.getItem('form')
            if (sessionForm) {
                const formData: State = JSON.parse(sessionForm)
                const slug: string = slugify(formData.title, {
                    replacement: '_',
                    lower: true,
                })

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

                const preview = formData.preview_image

                const POST_REQUEST = '/api/db/experiences' + `/${slug}`
                setDisabled(true)
                const res = await fetch(POST_REQUEST, {
                    method: 'POST',
                    body: JSON.stringify({
                        ...formData,
                        preview_image: preview,
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

    useEffect(() => {
        window.sessionStorage.setItem('form', JSON.stringify(state))
    }, [state])

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
                        step={state.step}
                        state={state}
                        dispatch={dispatch}
                    />
                    <DialogFooter>
                        {state.step - 1 >= 0 && (
                            <Button
                                onClick={() =>
                                    dispatch({ type: 'previous-step' })
                                }
                                variant={'secondary'}
                            >
                                Previous
                            </Button>
                        )}
                        {state.step >= 0 && state.step + 1 < 2 && (
                            <Button
                                onClick={() =>
                                    dispatch({ type: 'continue-step' })
                                }
                                variant={'secondary'}
                            >
                                Continue
                            </Button>
                        )}
                        {state.step == 1 && (
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
