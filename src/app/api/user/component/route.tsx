import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const prisma = new PrismaClient();
    try {
        const { name, description, content, userId } = await req.json();
        if (!name || !description || !content || !userId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing required fields.",
                },
                { status: 400 },
            );
        }

        const component = await prisma.component.create({
            data: {
                name,
                description,
                content,
                userId,
            },
        });

        return NextResponse.json({ success: true, component });
    } catch (error: any) {
        console.log(
            "Error creating component",
            (error.message as string) || "Error during component creation",
        );
        return NextResponse.json(
            {
                success: false,
                error: "Server error. Please try again later.",
            },
            { status: 500 },
        );
    }
};
