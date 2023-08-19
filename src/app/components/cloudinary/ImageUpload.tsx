import React, { useState } from 'react'
import { cloudinaryName, cloudinaryPreset } from './config'
import axios from 'axios'
import { Input } from '@/components/ui/input'

type Props = {
    multiple?: boolean
    setRes: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ImageUpload({ multiple = false, setRes }: Props) {
    const [images, setImages] = useState<FileList | null>()

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files
        if (!files) return
        setImages(files)
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', cloudinaryPreset as string)
        const resp = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
            formData
        )
        console.log(resp.data)
        setRes((res) => [...res, resp.data])
    }

    const showImageName = () => {
        if (multiple) {
            let image_str = ''
            if (images && images.length > 1) {
                for (let idx = 0; idx < (images ? images.length : 0); idx++) {
                    image_str += images[idx].name + ' '
                }
            }

            return image_str
        }
        return images ? images[0].name : ''
    }

    return (
        <Input
            value={showImageName()}
            multiple={multiple}
            accept="image/*"
            onChange={(e) => uploadImage(e)}
        ></Input>
    )
}
