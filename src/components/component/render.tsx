"use client";

import React from "react";
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
import { CodeBlock, dracula } from "react-code-blocks";

type Props = {
    code: string;
};

function JSXBlock({ code }: Props) {
    return (
        <CodeBlock
            text={code}
            language={"jsx"}
            showLineNumbers={true}
            theme={dracula}
        />
    );
}

export default JSXBlock;
