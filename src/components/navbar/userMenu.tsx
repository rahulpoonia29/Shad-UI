import { Bell } from "lucide-react";
import { User } from "next-auth";
import Profile from "./Profile";
import Breadcrumb from "./breadcrumb";

type Props = {
    user: User;
};

function UserMenu({ user }: Props) {
    return (
        <div className="mr-6 flex h-5 items-center space-x-6 text-gray-500">
            <Bell className="size-8 cursor-pointer rounded-lg border-2 border-gray-500 bg-amber-200/30 p-1.5 text-yellow-400 transition-colors hover:bg-amber-200/50 hover:text-yellow-500" />
            <Profile user={user} />
        </div>
    );
}

export default UserMenu;
