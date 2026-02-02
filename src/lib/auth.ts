import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { isAdminAuthorized } from "@/lib/storage";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Get GitHub username from Google profile
            // Note: This requires the user to have their GitHub linked to Google
            // For now, we'll use email to match
            const email = user.email;

            if (!email) {
                return false;
            }

            // Check if user is authorized admin
            // You can customize this logic based on how you want to verify
            const isAuthorized = await isAdminAuthorized(email.split('@')[0]);

            return isAuthorized;
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.picture as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
        error: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
