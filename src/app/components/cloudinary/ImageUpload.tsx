'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { RootState, store } from '@/store'
import { setPreviewImage, addDetailedImages } from '@/store/experienceState'
import { useSelector } from 'react-redux'

type Props = {
    multiple?: boolean
}

// TODO: accept value from parent
// TODO: set value to parent
// TODO: use redux inside of here???, pass ACTION to this component

export default function ImageUpload({ multiple = false }: Props) {
    const [images, setImages] = useState<FileList | null>()
    // const [stored, setStored] = useState<string[]>([])
    const [value, setValue] = useState('')

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
                return <img src={storedImage} alt="preview" />
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
        setImages(files)

        if (images) {
            if (multiple) {
                for (const idx in images) {
                    const url = await toCloudinary(images[idx])
                    store.dispatch(addDetailedImages(url))
                }
            } else {
                const url = await toCloudinary(images[0])
                store.dispatch(setPreviewImage(url))
            }
        }
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
                className="border-black border-2 p-3 rounded-md"
            >
                {multiple ? 'Upload Images' : 'Upload Image'}
                {displayStoredImages()}
            </label>
        </>
    )
}
