import { auth } from "@/auth";
import UserMenu from "./userMenu";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import Breadcrumb from "./breadcrumb";

type Props = {};

async function Navbar({}: Props) {
    const session = await auth();

    return (
        <header className="sticky top-0 z-10 flex h-16 w-full shrink-0 items-center justify-between border-b-2 bg-gray-50 px-4 backdrop-filter md:px-8">
            <Breadcrumb />
            <div className="flex items-center gap-3">
                {session?.user ? (
                    UserMenu({ user: session.user })
                ) : (
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href="/signin">Sign In</Link>
                        </Button>

                        <Button asChild>
                            <Link href="/signup">Register</Link>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Navbar;
