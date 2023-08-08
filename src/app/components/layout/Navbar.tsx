'use client'

import Link from 'next/link'
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
    const pathname: string = usePathname()
    const navRef = useRef<HTMLDivElement>(null)
    const timeRef = useRef<NodeJS.Timeout>()
    const [stickyPos, setStickyPos] = useState<string>('')

    const [start, setStart] = useState(true)

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add('translate-x-[-100px]')
        // // remove the event listener to ensure it only happens once
        // e.currentTarget.removeEventListener('mouseleave', onMouseLeave)
        store.dispatch(setNavOpen(false))
    }

    const reportWindowPos = () => {
        const posY = `${window.scrollY}px`
        setStickyPos(posY)
    }

    useEffect(() => {
        if (window.outerWidth > 768) {
            window.addEventListener('scroll', reportWindowPos)
        }

        if (navRef.current) {
            navRef.current.classList.remove('md:translate-x-[-100px]')
            navRef.current.classList.remove('max-md:translate-y-[-40px]')
        }
        setTimeout(() => {
            setStart(false)
        }, 2500)
        timeRef.current = setTimeout(() => {
            if (navRef.current) {
                navRef.current.classList.add('md:translate-x-[-100px]')
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
            className={`flex flex-row md:flex-col justify-center max-md:translate-y-[-40px] max-md:hover:translate-y-[0px] max-md:h-[10vh] max-md:w-[100vw] md:w-auto md:h-[100vh] transition-all duration-500 max-md:translate-x-0 md:translate-x-[-100px] md:hover:translate-x-0 hover:delay-[0ms] delay-[700ms] `}
        >
            <header
                className={`${
                    start && style.initialLoad
                } transition-all max-md:h-[60px] text-center max-md:pt-4 overflow-auto duration-500 flex px-4 max-md:w-[90vw] md:w-auto md:h-[90vh] border-neutral-300 max-md:border-b-2 md:border-r-2 flex-row md:flex-col justify-around`}
                style={{ transform: `translateY(${stickyPos})` }}
            >
                {names.map((item, idx) => {
                    if (pathname == path[idx]) {
                        return (
                            <Link
                                key={item}
                                className=" px-5 hover:underline text-teal-700"
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
