'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import style from './css/layout.module.css'
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
    const pathname: string = usePathname()
    const navRef = useRef<HTMLDivElement>(null)
    const timeRef = useRef<NodeJS.Timeout>()

    const [start, setStart] = useState(true)

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add('translate-x-[-100px]')
        store.dispatch(setNavOpen(false))
    }

    useEffect(() => {
        if (navRef.current) {
            navRef.current.classList.remove('lg:translate-x-[-100px]')
            navRef.current.classList.remove('max-xl:translate-y-[-40px]')
        }
        setTimeout(() => {
            setStart(false)
        }, 2500)
        timeRef.current = setTimeout(() => {
            if (navRef.current) {
                navRef.current.classList.add('lg:translate-x-[-100px]')
            }
            store.dispatch(setNavOpen(false))
        }, 3000)
    }, [])

    return (
        <div
            onMouseEnter={() => store.dispatch(setNavOpen(true))}
            onMouseLeave={handleMouseLeave}
            onMouseOver={() => clearTimeout(timeRef.current)}
            ref={navRef}
            className={`sticky top-0 z-[1000] flex flex-row lg:flex-col justify-center max-xl:translate-y-[-40px] max-xl:hover:translate-y-[0px] max-xl:h-[10vh] max-xl:w-[100vw] lg:w-auto lg:h-[100vh] transition-all duration-500 max-xl:translate-x-0 lg:translate-x-[-100px] lg:hover:translate-x-0 hover:delay-[0ms] delay-[700ms] `}
        >
            <header
                className={`${
                    start && style.initialLoad
                } transition-all max-xl:h-[60px] bg-white text-center max-xl:pt-4 overflow-auto duration-500 flex px-4 max-xl:w-[90vw] lg:w-auto lg:h-[90vh] border-neutral-300 max-xl:border-b-2 lg:border-r-2 flex-row lg:flex-col justify-around`}
            >
                {names.map((item, idx) => {
                    if (pathname == path[idx]) {
                        return (
                            <Link
                                key={item}
                                className=" px-5 hover:underline text-teal-700"
                                href={path[idx]}
                                prefetch={false}
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
                            prefetch={false}
                        >
                            {item}
                        </Link>
                    )
                })}
            </header>
        </div>
    )
}
