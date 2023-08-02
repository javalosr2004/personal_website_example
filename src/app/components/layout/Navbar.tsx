'use client'

import Link from 'next/link'
import { useMediaQuery } from 'usehooks-ts'
import { usePathname } from 'next/navigation'
import style from './layout.module.css'
import { useEffect, useRef, useState } from 'react'
import { store } from '@/store'
import { setNavOpen } from '@/store/navState'

export default function Navbar({
    names,
    path,
}: {
    names: string[]
    path: string[]
}) {
    // const [visited, setVisited] = useState<string[]>([])
    const matches = useMediaQuery('(min-width: 768px)')
    const pathname: string = usePathname()

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

    // const onMouseLeave = () => {
    //     console.log('mouseleave')
    // }

    if (matches) {
        const navRef = useRef<HTMLDivElement>(null)
        const [start, setStart] = useState(true)

        const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.classList.add('translate-x-[-100px]')
            // // remove the event listener to ensure it only happens once
            // e.currentTarget.removeEventListener('mouseleave', onMouseLeave)
            store.dispatch(setNavOpen(false))
        }

        useEffect(() => {
            if (navRef.current) {
                navRef.current.classList.remove('translate-x-[-100px]')
            }
            setTimeout(() => {
                setStart(false)
            }, 2500)
            setTimeout(() => {
                if (navRef.current) {
                    navRef.current.classList.add('translate-x-[-100px]')
                }
                store.dispatch(setNavOpen(false))
            }, 3000)
        }, [])
        return (
            <div
                onMouseEnter={() => store.dispatch(setNavOpen(true))}
                onMouseLeave={handleMouseLeave}
                ref={navRef}
                className={`flex flex-col justify-center h-[100vh] transition-all duration-500 translate-x-[-100px] hover:translate-x-0 hover:delay-[0ms] delay-[700ms]`}
            >
                <header
                    className={`${
                        start && pathname == '/' && style.initialLoad
                    } transition-all overflow-auto duration-500 flex px-4 h-[90vh] border-neutral-300  border-r-2 flex-col justify-around`}
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
    } else {
        store.dispatch(setNavOpen(true))
        return (
            <div
                onMouseEnter={() => store.dispatch(setNavOpen(true))}
                className={`flex flex-row justify-center h-[0vh] mt-10 w-[100vw] transition-all duration-500 translate-y-[10px] hover:translate-y-0 hover:delay-[0ms] delay-[700ms]`}
            >
                <header
                    className={`${style.initialLoadMobile} transition-all w-[90vw] overflow-auto duration-500 flex h-[10vh] border-neutral-300  border-b-2 flex-row justify-around`}
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
}
