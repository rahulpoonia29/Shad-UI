// "use client";

import { Button } from "@/components/ui/button";
import { Component } from "@prisma/client";
import Link from "next/link";

type Props = {
    component: Component;
};

const ComponentCard = ({ component }: Props) => {
    return (
        <div className="mx-auto w-full rounded-xl bg-white shadow-md">
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                    {component.name}
                </h2>
                <p className="text-gray-600">{component.description}</p>
                <Button className="mt-4" asChild>
                    <Link href={`/component/${component.id}`}>Visit</Link>
                </Button>
            </div>
        </div>
    );
};

export default ComponentCard;
