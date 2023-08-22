'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { RootState, store } from '@/store'
import { setPreviewImage, addDetailedImages } from '@/store/experienceState'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

type Props = {
    multiple?: boolean
}

// TODO: accept value from parent
// TODO: set value to parent
// TODO: use redux inside of here???, pass ACTION to this component

export default function ImageUpload({ multiple = false }: Props) {
    const [value, setValue] = useState('')
    // different states for uploading and image loading
    const [uploading, setUploading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)

    const preview_image = useSelector<RootState, string>(
        (state) => state.experience.preview_image
    )
    const detailed_images = useSelector<RootState, string[]>(
        (state) => state.experience.detailed.images
    )

    // find a way to cache images, possibly use server component, pass as props
    const displayStoredImages = () => {
        if (multiple) {
            if (detailed_images.length > 0) {
                return detailed_images.map((image, idx) => {
                    return <img key={idx} src={image} alt="preview" />
                })
            }
        } else {
            if (preview_image) {
                return (
                    <div className="absolute hover:cursor-pointer rounded-md overflow-hidden right-[50px] w-[50px]">
                        <Link href={preview_image} target="__blank">
                            <Image
                                src={preview_image}
                                className={`${
                                    imageLoading
                                        ? 'animate-pulse bg-slate-300'
                                        : ''
                                }`}
                                width={200}
                                height={200}
                                alt="preview"
                                onLoadingComplete={() => setImageLoading(false)}
                            />
                        </Link>
                    </div>
                )
            }
        }
    }

    const toCloudinary = async (image: File) => {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'ivnvpy9x')
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/dvs7h3oyp/image/upload`,
            formData
        )
        return res.data.secure_url
    }

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        const files = e.currentTarget.files
        if (!files) return
        setUploading(true)
        if (multiple) {
            for (let i = 0; i < files.length; i++) {
                const url = await toCloudinary(files[i])
                store.dispatch(addDetailedImages(url))
            }
        } else {
            const url = await toCloudinary(files[0])
            store.dispatch(setPreviewImage(url))
        }
        setUploading(false)
        setImageLoading(true)
    }

    return (
        <>
            <Input
                type="file"
                value={value}
                id="input"
                multiple={multiple}
                accept="image/*"
                className="hidden"
                onChange={(e) => uploadImage(e)}
            ></Input>
            <label
                htmlFor="input"
                className="flex text-sm h-20 items-center w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {uploading || imageLoading ? 'Uploading...' : 'Upload Image'}
                {uploading && (
                    <div className="absolute rounded-md overflow-hidden right-[50px] ">
                        <Skeleton className="bg-slate-300 w-[50px] h-[50px]"></Skeleton>
                    </div>
                )}
                {!uploading && displayStoredImages()}
            </label>
        </>
    )
}
