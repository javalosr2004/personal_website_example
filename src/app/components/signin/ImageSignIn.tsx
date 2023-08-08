'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export default function ImageSignIn() {
    const { status } = useSession()

    const handleClick = () => {
        if (status !== 'authenticated') {
            signIn('github')
        } else {
            signOut()
        }
    }

    return (
        <div
            onClick={handleClick}
            className={`${
                status === 'authenticated' ? 'border-green-600' : 'border-black'
            } relative overflow-hidden border-4 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-[50%] my-4`}
        >
            <Image
                src={'/avatar.jpg'}
                alt="Picture of Jesus Avalos"
                fill={true}
                style={{ objectFit: 'cover' }}
                draggable={false}
            ></Image>
        </div>
    )
}
