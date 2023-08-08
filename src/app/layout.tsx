import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/layout/Navbar'
import Providers from './Providers'
import TransitionNav from '@/app/components/layout/TransitionNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Jesus' Website",
    description: 'Just an personal website.',
    viewport: { width: 'device-width', initialScale: 1 },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html className="overflow-x-hidden" lang="en">
            <body
                className={`${inter.className} flex flex-col md:flex-row content-stretch`}
            >
                <Navbar
                    names={['Home', 'About']}
                    path={['/', '/about']}
                ></Navbar>
                <Providers>
                    <TransitionNav>{children}</TransitionNav>
                </Providers>
            </body>
        </html>
    )
}

// forbidden css
//  transform hover:translate-x-[-100px] hover:delay-[700ms]
