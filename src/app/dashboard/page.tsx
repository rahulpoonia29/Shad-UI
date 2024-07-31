import { auth } from "@/auth";
import prisma from "@/lib/prismaClient";
import React, { Suspense } from "react";
import ComponentCard from "./component";
import { Component } from "@prisma/client";

type Props = {};

async function Home({}: Props) {
    const session = await auth();

    const components = await prisma.component.findMany({
        take: 6,
        where: {
            userId: session?.user?.id,
        },
    });

    return (
        <section className="w-full p-3">
            <h1 className="text-lg font-semibold">Your components:</h1>
            <section className="mt-2 grid w-full grid-cols-1 gap-2 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
                <Suspense fallback={<div>Loading...</div>}>
                    {components.map((component) => (
                        <ComponentCard
                            key={component.id}
                            component={component as Component}
                        />
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
