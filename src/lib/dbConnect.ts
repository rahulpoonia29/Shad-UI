import { PrismaClient } from "@prisma/client";

export const dbConnect = async () => {
	const prisma = new PrismaClient();
	try {
		await prisma.$connect();
		console.log("Connected to database");
		return prisma;
	} catch (error) {
		console.log("Error connecting to database", error);
		throw new Error("Error connecting to database");
		process.exit(1);
	}
};
