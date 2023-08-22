'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { RootState, store } from '@/store'
import { setPreviewImage, addDetailedImages } from '@/store/experienceState'
import { useSelector } from 'react-redux'
import Image from 'next/image'

type Props = {
    multiple?: boolean
}

// TODO: accept value from parent
// TODO: set value to parent
// TODO: use redux inside of here???, pass ACTION to this component

export default function ImageUpload({ multiple = false }: Props) {
    // const [stored, setStored] = useState<string[]>([])
    const [value, setValue] = useState('')
    const [uploading, setUploading] = useState(false)

    // find a way to cache images, possibly use server component, pass as props
    const displayStoredImages = () => {
        if (multiple) {
            const storedImages = useSelector<RootState, string[]>(
                (state) => state.experience.detailed.images
            )
            if (storedImages.length > 0) {
                return storedImages.map((image, idx) => {
                    return <img key={idx} src={image} alt="preview" />
                })
            }
        } else {
            const storedImage = useSelector<RootState, string>(
                (state) => state.experience.preview_image
            )
            if (storedImage) {
                return (
                    <div className="absolute rounded-md overflow-hidden right-[50px] w-[50px]">
                        <Image
                            src={storedImage}
                            width={200}
                            height={200}
                            alt="preview"
                        />
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
                {uploading ? 'Uploading...' : 'Upload Image'}
                {displayStoredImages()}
            </label>
        </>
    )
}
