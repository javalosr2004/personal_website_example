import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        jwt: async ({ token, user, trigger }) => {
            if (user && trigger == 'signUp') {
                const admins = ['jesusavalosr2004@gmail.com']
                token.isAdmin = admins.includes(user?.email || '')
            }
            return token
        },
    },
})

export { handler as GET, handler as POST }
