'use client'

import React, { useState, useEffect } from 'react'

export default function HomePage() {
    interface windowType {
        width: number
        height: number
    }

    const [windowSize, setWindowSize] = useState<windowType>()

    useEffect(() => {
        console.log('update')
        if (window) {
            setWindowSize({
                width: window.outerWidth,
                height: window.outerHeight,
            })
        }
    }, [window.outerHeight, window.outerWidth])

    return (
        <div>
            <h1>
                Width: <b>${windowSize?.width}</b>
            </h1>
            <h1>
                Height: <b>${windowSize?.height}</b>
            </h1>
        </div>
    )
}

// return (
//     <div>
//         <h1 className="mt-3 text-2xl lg:text-3xl">About Me</h1>
//     </div>
// )

// const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
// })

// const handleResize = () => {
//     setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//     })
// }

// useEffect(() => {
//     window.addEventListener('resize', handleResize)

//     // Cleanup: remove the listener when the component is unmounted
//     return () => {
//         window.removeEventListener('resize', handleResize)
//     }
// }, [])

// <li
//     style={{
//         width: `${windowSize.width}px`,
//         height: `${windowSize.height}px`,
//         overflow: 'hidden',
//     }}
//     className="relative flex justify-center mt-0 bg-black/20"
// >
//     {/* Your other code here */}
// </li>
