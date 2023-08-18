import { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                const admins = process.env.ADMINS as string
                token.isAdmin = admins.includes(user?.email || '')
            }
            return token
        },
        session: async ({ session, token }) => {
            session.user.isAdmin = token.isAdmin as boolean
            return session
        },
    },
}
