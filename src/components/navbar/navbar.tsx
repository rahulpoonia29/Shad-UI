import UserMenu from "./userMenu";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";

type Props = {
	session: Session | null;
};

function Navbar({ session }: Props) {
	return (
		<header className="sticky top-0 z-10 backdrop-filter bg-gray-50 flex justify-between h-16 w-full shrink-0 items-center px-4 md:px-8">
			<Button asChild variant="ghost">
				<Link className="text-md" href="/">
					<Command className="h-6 w-6" />
					&nbsp;&nbsp; Shad UI
				</Link>
			</Button>

			<div className="flex gap-3 items-center">
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
