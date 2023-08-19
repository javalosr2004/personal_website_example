import React from 'react'
import HelloStranger from './HelloStranger'

// the name of the function doesn't matter in page.tsx

export default function Page() {
    return (
        <div className="text-center w-[90vw]">
            <HelloStranger name="Everyone" />
        </div>
    )
}
