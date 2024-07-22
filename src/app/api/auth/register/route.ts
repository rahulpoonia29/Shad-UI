import { dbConnect } from "@/lib/dbConnect";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
	const prisma = new PrismaClient();
	try {
		const { name, email, password } = await req.json();
		if (!name || !email || !password)
			return NextResponse.json(
				{ success: false, error: "Invalid input" },
				{ status: 422 },
			);

		dbConnect();
		const user = await prisma.user.findMany({
			where: {
				OR: [{ name }, { email }],
			},
		});
		if (user.length > 0) {
			return NextResponse.json(
				{ success: false, error: "User already exists. Please Login." },
				{ status: 409 },
			);
		}

		// Hash the password before storing it in the database
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				components: {
					create: [],
				},
			},
		});
		return NextResponse.json(
			{
				success: true,
				user: {
					name: newUser.name,
					email: newUser.email,
				},
			},
			{ status: 201 },
		);
	} catch (error: any) {
		console.log(
			"Error registering user",
			(error.message as string) || "Error during registeration",
		);
		return NextResponse.json(
			{
				success: false,
				error: "Server error. Please try again later.",
			},
			{
				status: 500,
			},
		);
	} finally {
		await prisma.$disconnect();
	}
};
