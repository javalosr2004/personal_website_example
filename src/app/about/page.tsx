'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function HomePage() {
    interface windowType {
        width: number
        height: number
    }

    const [windowSize, setWindowSize] = useState<windowType>()
    const window = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log('update')
        if (window.current) {
            setWindowSize({
                width: window.current.clientWidth,
                height: window.current.clientHeight,
            })
        }
    }, [window.current])

    return (
        <div ref={window}>
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
