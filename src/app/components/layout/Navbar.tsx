'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import style from './layout.module.css'
import { useEffect, useRef, useState } from 'react'
import { RootState, store } from '@/store'
import { setNavOpen } from '@/store/navState'
import { useSelector } from 'react-redux'

export default function Navbar({
    names,
    path,
}: {
    names: string[]
    path: string[]
}) {
    // const [visited, setVisited] = useState<string[]>([])

    const navRef = useRef<HTMLDivElement>(null)
    const [start, setStart] = useState(true)
    const navOpen = useSelector<RootState, boolean>(state => state.nav.open)

    const pathname: string = usePathname()

    useEffect(() => {
        if (navRef.current) {
            navRef.current.classList.remove('translate-x-[-100px]')
        }
        setTimeout(() => setStart(false), 2500)
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

    // const onMouseLeave = () => {
    //     console.log('mouseleave')
    // }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add('translate-x-[-100px]')
        // // remove the event listener to ensure it only happens once
        // e.currentTarget.removeEventListener('mouseleave', onMouseLeave)
        store.dispatch(setNavOpen(false))
    }

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        setTimeout(() => {
            e.currentTarget.classList.add('translate-x-[-100px]')
        }, 1000)
    }

    return (
        <div
            onMouseEnter={() => store.dispatch(setNavOpen(true))}
            onMouseLeave={handleMouseLeave}
            onTransitionEnd={handleTransitionEnd}
            ref={navRef}
            className={`${} flex flex-col justify-center h-[100vh] transition-all duration-500 translate-x-[-100px] hover:translate-x-0 hover:delay-[0ms] delay-[700ms]`}
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
}
