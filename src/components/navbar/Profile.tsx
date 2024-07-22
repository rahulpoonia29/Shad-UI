import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "next-auth";

type Props = {
    user: User;
};

function Profile({ user }: Props) {
    return (
        <div className="flex items-center">
            <Avatar className="mr-3 rounded-lg">
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

            <div className="text- font-semibold text-gray-700">
                {user.name?.split(" ")[0]}
            </div>
        </div>
    );
}

export default Profile;
