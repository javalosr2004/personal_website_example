// next-auth.d.ts
import 'next-auth'

interface extendedJWT {
    isAdmin?: boolean
}

declare module 'next-auth/jwt' {
    interface JWT extends extendedJWT {}
}
