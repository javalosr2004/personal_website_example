'use client'
import React, { useEffect, useReducer } from 'react'
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

import { Calendar } from '@/components/ui/calendar'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AddExperience() {
    const initialState = {
        step: 0,
        title: '',
        date: undefined,
        simple_description: '',
        preview_image: '',
        detailed_description: '',
        carousel_images: '',
        alt: '',
        root_folder: '',
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        window.sessionStorage.setItem('form', JSON.stringify(state))
    }, [state])
    return (
        <div className="w-200px mt-5">
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
                    {state.step == 0 ? (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
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
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-flow-col gap-4 items-center mt-4 ">
                                <Label htmlFor="date" className="text-right">
                                    Date
                                </Label>
                                <div className="h-[350px] w-[280px]">
                                    <Calendar
                                        id="date"
                                        mode="range"
                                        selected={state.date}
                                        onSelect={(selected) =>
                                            dispatch({
                                                type: 'set-date',
                                                payload: selected,
                                            })
                                        }
                                    ></Calendar>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 mt-4">
                                <Label
                                    htmlFor="simple_description"
                                    className="text-right"
                                >
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
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="description"
                                    className="text-right"
                                >
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
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-flow-col gap-4 items-center mt-4 ">
                                <Label
                                    htmlFor="root_folder"
                                    className="text-right"
                                >
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
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-flow-col gap-4 items-center mt-4 ">
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
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 mt-4">
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
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    )}
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
                            <DialogTrigger>
                                <Button>Submit</Button>
                            </DialogTrigger>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
