import { auth, getSessionServer, signIn, signOut } from "@/auth";
import Navbar from "@/components/navbar/navbar";
import UserMenu from "@/components/navbar/userMenu";
import { Button } from "@/components/ui/button";
import { dbConnect } from "@/lib/dbConnect";
import { Command, Pen } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import ComponentCard from "./component";

type Props = {};

async function Home({}: Props) {
    const prisma = await dbConnect();
    const session = await auth();

    const components = await prisma.component.findMany({
        take: 6,
        where: {
            userId: session?.user?.id,
        },
    });

    // console.log("components:", components);

    return (
        <section className="p-3 w-full bg-red-400">
            <h1 className="text-lg font-semibold">Your components:</h1>
            <section className="flex w-full gap-2">
                <Suspense fallback={<div>Loading...</div>}>
                    {components.map((component) => (
                        <ComponentCard key={component.id} component={component} />
                    ))}
                </Suspense>
            </section>
        </section>
    );
    // const session = await getSessionServer();

    // return <Navbar session={session} />;
    // if (!session?.user) {
    // 	return (
    // 		<>
    // 			<form
    // 				action={async () => {
    // 					"use server";
    // 					await signIn();
    // 				}}
    // 			>
    // 				<button type="submit">Signin with GitHub</button>
    // 			</form>
    // 		</>
    // 	);
    // }
    // return (
    // 	<div>
    // 		<img src={session?.user?.image as string} alt="User Avatar" />
    // 		<form
    // 			action={async () => {
    // 				"use server";
    // 				await signOut();
    // 			}}
    // 		>
    // 			<button type="submit">Sign Out</button>
    // 		</form>
    // 		<div>{JSON.stringify(session)}</div>
    // 	</div>
    // );
}

export default Home;
