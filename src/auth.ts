import NextAuth, { Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import prisma from "./lib/prismaClient";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    placeholder: "johndoe@email.com",
                    type: "email",
                    required: true,
                },
                password: {
                    label: "Password",
                    placeholder: "your password",
                    type: "password",
                    required: true,
                },
            },
            authorize: async (credentials) => {
                const email = credentials.email as string;
                const password = credentials.password as string;

                if (!email || !password) {
                    return null;
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: email,
                        },
                    });

                    if (!user) return null;

                    const isValid = await bcrypt.compare(
                        password,
                        user.password as string,
                    );

                    if (!isValid) return new Error("Invalid credentials");

                    return user;
                } catch (error: any) {
                    console.error(
                        "Error during authentication:",
                        error.message,
                    );
                    throw null;
                }
            },
        }),
        Github,
        Google,
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
        // error: "/error", // Error page
    },
    debug: process.env.NODE_ENV === "development",
});

export async function getSessionServer() {
    const session = await auth();
    if (session?.user) return session as Session;
    return null;
}

// export function loginIsRequiredClient() {
// 	if (typeof window !== "undefined") {
// 		const session = useSession();
// 		const router = useRouter();
// 		if (!session) router.push("/");
// 	}
// }
