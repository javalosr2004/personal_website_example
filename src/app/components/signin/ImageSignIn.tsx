'use client'

import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { useSession } from 'next-auth/react'

export default function ImageSignIn() {
    const session = useSession()

    const handleClick = () => {
        if (session.status != 'authenticated') {
            signIn('github')
        } else {
            signOut()
        }
    }

    return (
        <div
            onClick={handleClick}
            className={`${
                session.status == 'authenticated'
                    ? 'border-green-600'
                    : 'border-black'
            } hover:cursor-pointer relative overflow-hidden border-4 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-[50%] my-4`}
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
