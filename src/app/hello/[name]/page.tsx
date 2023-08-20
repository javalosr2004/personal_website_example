import React from 'react'

type Props = {
    params: { name: string }
}

export default function HelloStranger({ params }: Props) {
    const formattedName = params.name[0].toUpperCase() + params.name.slice(1)

    return (
        <div className="text-center w-[90vw]">
            <h1 className="hover:text-red-400">Hello {formattedName}!</h1>
        </div>
    )
}
