import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { User } from "next-auth";
import Logout from "./logout";

type Props = {
	user: User;
};

function UserMenu({ user }: Props) {
	return (
		<div className="flex">
			<Avatar className="mr-2">
				<AvatarImage src={user.image as string} alt="@profileImg" />
				<AvatarFallback>
					{user.name
						? user.name.charAt(0) +
						  (user.name.indexOf(" ") !== -1
								? user.name.charAt(user.name.indexOf(" ") + 1)
								: "")
						: ""}
				</AvatarFallback>
			</Avatar>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="group text-md flex gap-1 pr-2 transition-all "
					>
						{user.name?.split(" ")[0]}
						<ChevronRight className="h-4 w-4 group-hover:rotate-90 transition-all" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mt-4 mr-10 w-40 text-lg">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild className="cursor-pointer">
						{/* <Link href={`/profile/${userData?.$id}`}>Profile</Link> */}
					</DropdownMenuItem>
					<DropdownMenuItem asChild className="cursor-pointer">
						<Link href={"/new"}>Create New Post</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						Settings
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<Logout />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default UserMenu;
