import React from 'react'

type Props = {
    name: string
}

export default function HelloStranger({ name }: Props) {
    return (
        <>
            <h1 className="hover:text-red-400">Hello {name}!</h1>
        </>
    )
}
