import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import UserAvatar from "../common/UserAvatar";
import Notification from "./Notification";

const Header = () => {
  const user = useAuth();
  return (
    user &&
    user.isAuthenticated && (
      <div className="py-2 px-4 flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 rounded-[20px] bg-gray-300 flex items-center justify-center">
            <UserAvatar avatar={user.avatar} />
          </div>
          <div className="flex flex-col justify-center text-white font-semibold">
            <span>Hi, {user.name}</span>
            <span className="underline text-xs">{user.username}</span>
          </div>
        </div>
        <Notification />
      </div>
    )
  );
};

export default Header;
