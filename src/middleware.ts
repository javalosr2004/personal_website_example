import { withAuth } from 'next-auth/middleware'

// TOOD: add mongoose middleware

export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            if (!token) return false
            return token.isAdmin || false
        },
    },
})

export const config = { matcher: ['/experience/[slug]/edit'] }
