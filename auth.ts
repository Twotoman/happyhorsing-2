import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { prisma } from "@/db/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {getUserByEmail} from "@/lib/db/data"



export const {auth, handlers, signIn, signOut} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    // ✅ Production-ready cookie configuration
    cookies: {
        sessionToken: {
        name:
            process.env.NODE_ENV === 'production'
            ? `__Secure-next-auth.session-token`
            : `next-auth.session-token`,
        options: {
            httpOnly: true, // Prevents XSS session theft
            sameSite: 'lax', // Allows safe cross-origin navigation
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            domain:
            process.env.NODE_ENV === 'production'
                ? '.example.com' // Note leading dot for subdomains
                : undefined,
            maxAge: 30 * 24 * 60 * 60, // 30 days
        },
        },
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
            }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    
                    console.log('authorize: ', parsedCredentials.data);

                    const { email, password } = parsedCredentials.data;
                    const user = await getUserByEmail(email);
                    if (!user) return null;

                    // Falls User z.B. nur via OAuth existiert und kein Passwort hat
                    if (!user.passwordHash) return null;

                    //erzeuge das Hash mit bcrypt und vergleiche mit dem gespeicherten Hash
                    const ok = await bcrypt.compare(password, user.passwordHash);
                    console.log('Passwort ok?',ok);
                    
                    if (ok) {
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        }
                    }

                }
                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});