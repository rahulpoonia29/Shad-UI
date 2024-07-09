// import { ThemeToggle } from '~/routes/resources.theme-toggle';
import { Command } from "lucide-react";
import Link from "next/link";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CodeView } from "./code-view";

export const Header = () => {
	return (
		<nav className="flex items-center justify-between p-4 w-full border-b">
			<Link href="/" className="flex items-center space-x-2">
				<Command className="h-6 w-6" />
				<h2 className="text-xl font-semibold">ShadUI</h2>
			</Link>
			{/* <ThemeToggle /> */}
		</nav>
	);
};
