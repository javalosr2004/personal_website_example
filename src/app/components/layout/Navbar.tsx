'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import style from './layout.module.css'
import { useEffect, useRef, useState } from 'react'

export default function Navbar({
    names,
    path,
}: {
    names: string[]
    path: string[]
}) {
    // const [visited, setVisited] = useState<string[]>([])

    const navRef = useRef<HTMLDivElement>(null)

    const pathname: string = usePathname()

    useEffect(() => {
        if (navRef.current) {
            navRef.current.classList.remove('translate-x-[-100px]')
        }
    }, [])

    // won't work because it isn't NavBar is rendered once.

    // useEffect(() => {
    //     const visitedItem = window.localStorage.getItem('visited')

    //     if (visitedItem == null) {
    //         setVisited([pathname])
    //     } else {
    //         setVisited([...JSON.parse(visitedItem), pathname])
    //     }
    //     window.localStorage.setItem('visited', JSON.stringify(visited))
    // }, [])

    const onMouseLeave = (e) => {
        e.currentTarget.classList.add('translate-x-[-100px]')
        // remove the event listener to ensure it only happens once
        e.currentTarget.removeEventListener('mouseleave', onMouseLeave)
    }

    return (
        <div
            onMouseLeave={onMouseLeave}
            ref={navRef}
            className={`flex flex-col justify-center h-[100vh] transition-all duration-500 translate-x-[-100px] hover:translate-x-0 hover:delay-[0ms] delay-[300ms]`}
        >
            <header
                // style={{ transform: `translateX(${show ? '0px' : '-100px'})` }}
                className={`${style.initialLoad} transition-all overflow-auto duration-500 flex px-4 h-[90vh] border-neutral-300  border-r-2 flex-col justify-around`}
            >
                {names.map((item, idx) => {
                    if (pathname == path[idx]) {
                        return (
                            <Link
                                key={item}
                                className="px-5 hover:underline text-teal-700"
                                href={path[idx]}
                            >
                                {item}
                            </Link>
                        )
                    }
                    return (
                        <Link
                            key={item}
                            className="px-5 hover:underline"
                            href={path[idx]}
                        >
                            {item}
                        </Link>
                    )
                })}
            </header>
        </div>
    )
}
