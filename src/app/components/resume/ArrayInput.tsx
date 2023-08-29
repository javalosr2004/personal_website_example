import { Input } from '@/components/ui/input'
import { store } from '@/store'
import { addDetailedInformation } from '@/store/experienceState'
import React, { useState } from 'react'

export default function ArrayInput() {
    const [value, setValue] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        store.dispatch(addDetailedInformation(value))
        setValue('')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div>
            <Input
                value={value}
                type="text"
                onChange={handleChange}
                placeholder="Worked with React extensively."
            ></Input>
            <button type="button" onClick={handleSubmit}>
                Add Information
            </button>
        </div>
    )
}
