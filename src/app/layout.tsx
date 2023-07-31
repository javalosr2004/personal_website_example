import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Simple Blog',
    description: 'Literally just a simple blog',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-row`}>
                <Navbar
                    names={['Home', 'About']}
                    path={['/', '/about']}
                ></Navbar>
                <div className=" p-12">{children}</div>
            </body>
        </html>
    )
}
