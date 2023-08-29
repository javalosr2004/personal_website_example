'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar({
    names,
    path,
}: {
    names: string[]
    path: string[]
}) {
    const pathname: string = usePathname()

    const [scrollPosition, setScrollPosition] = useState(0)
    const [prevPosition, setPrevPositon] = useState(0)

    const [navPosition, setNavPosition] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY

            if (currentScrollPos < 20) {
                setPrevPositon(currentScrollPos)
            } else if (scrollPosition > currentScrollPos) {
                setPrevPositon(currentScrollPos)
                if (navPosition < -5) {
                    setNavPosition((current) => current + 10)
                }
            } else {
                if (navPosition > -80) {
                    setNavPosition((current) => current - 10)
                }
            }

            setScrollPosition(currentScrollPos)
            console.log(scrollPosition, prevPosition)
            console.log(navPosition)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [scrollPosition])

    return (
        <div
            style={{
                top: `${navPosition}px`,
            }}
            className={`sticky top-0 z-[1000] flex flex-row justify-center h-[50px] w-full`}
        >
            <header
                className={`h-[60px] bg-white text-center pt-4 overflow-auto flex px-4 w-full  border-neutral-300 border-b-2 flex-row justify-around`}
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
