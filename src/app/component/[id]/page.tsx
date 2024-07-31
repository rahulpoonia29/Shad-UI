import prisma from "@/lib/prismaClient";
import { Component } from "@prisma/client";
import { Alert } from "@/components/ui/alert";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import JSXBlock from "@/components/component/render";

type Props = {
    params: { id: string };
};

async function page({ params }: Props) {
    const component: Component | null = await prisma.component.findUnique({
        where: {
            id: params.id,
        },
    });

    console.log("Component", component?.content?.code);

    if (!component) {
        return <div>Component not found</div>;
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>{component.name}</CardTitle>
                <CardDescription>{component.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <JSXBlock code={component.content?.code as string} />
            </CardContent>
            <CardFooter>
                <Button>Edit</Button>
            </CardFooter>
        </Card>
    );
}

export default page;
