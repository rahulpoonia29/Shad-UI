import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/auth";

type Props = {};

function Logout({}: Props) {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <Button variant={"destructive"} className="w-full">
                Sign Out
            </Button>
        </form>
    );
}

export default Logout;
