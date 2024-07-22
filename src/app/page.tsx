import { auth, signIn, signOut } from "@/auth";
import React from "react";

type Props = {};

async function Home({}: Props) {
	const session = await auth();

	if (!session?.user) {
		return (
			<>
				<form
					action={async () => {
						"use server";
						await signIn();
					}}
				>
					<button type="submit">Signin with GitHub</button>
				</form>
			</>
		);
	}
	return (
		<div>
			<img src={session?.user?.image as string} alt="User Avatar" />
			<form
				action={async () => {
					"use server";
					await signOut();
				}}
			>
				<button type="submit">Sign Out</button>
			</form>
			<div>{JSON.stringify(session)}</div>
		</div>
	);
}

export default Home;
