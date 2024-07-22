import {
	Command,
	HandHelpingIcon,
	HomeIcon,
	Package2Icon,
	SettingsIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";
import { usePathname, useRouter } from "next/navigation";

type linkObject = {
	title: string;
	icon: any;
	path: string;
	children?: linkObject[];
}[];

const links: linkObject = [
	{
		title: "Home",
		icon: HomeIcon,
		path: "/dashboard",
	},
	{
		title: "Users",
		icon: UsersIcon,
		path: "/users",
	},
	{
		title: "Settings",
		icon: SettingsIcon,
		path: "/settings",
	},
];

type Props = {};

function Sidemenu({}: Props) {
	// const pathname = usePathname();

	return (
		<div className=" border-r-2 bg-gray-100/40  dark:bg-gray-800/40">
			<div className="flex flex-col">
				<div className="flex h-16 items-center px-6 ">
					<Link
						href="/dashboard"
						className="flex items-center gap-3 font-semibold"
						prefetch={false}
					>
						<Command className="h-6 w-6" />
						Shad UI
					</Link>
				</div>
				<nav className="grid items-start px-4 text-sm font-medium gap-1 mt-3">
					{links.map((link) => (
						<Link
							href={link.path}
							className={`flex items-center gap-3 rounded-lg px-3 py-3 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-gray-50
							
							`}
							prefetch={false}
						>
							<link.icon className="h-4 w-4" />
							{link.title}
						</Link>
					))}
				</nav>
			</div>
		</div>
		// </div>
	);
}

export default Sidemenu;
