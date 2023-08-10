// next-auth.d.ts
import { DefaultSession } from 'next-auth'

interface extendedJWT {
    isAdmin?: boolean
}

declare module 'next-auth/jwt' {
    interface JWT extends extendedJWT {}
}

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            isAdmin: boolean
        } & DefaultSession['user']
    }
}
