import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
const serverURL = process.env.NEXTAUTH_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                return credentials;
            },
        }),
    ],

    callbacks: {
        authorized: async ({ request, auth }) => {
            return auth;
        },

        // Include user data in the JWT
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },

        async signIn({ credentials, user }) {
            let response;
            try {
                response = await axios.post(`${serverURL}/api/auth/login`, {
                    credentials,
                });
            } catch (e) {
                console.log(e);
            }

            console.log(response);

            if (response.status === 200 && response.data.validLogin) {
                user.admin = response.data.adminUser;
                delete user.password;
                delete user.id;

                return true;
            }
        },

        // Make the admin field available in the session
        async session({ session, token }) {
            if (token) {
                session.user = token.user;
            }
            return session;
        },
    },

    // Optional session strategy
    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/login',
        error: '/login', // Redirect to your custom error page
        signOut: '/login',
    },
});
