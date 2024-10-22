import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import UserAvatar from "../common/UserAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const user = useAuth();
  return (
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
      <div className="w-6 h-6 flex justify-center items-center bg-white rounded-[12px] relative cursor-pointer">
        <FontAwesomeIcon icon={faBell} />
        <span className="bg-red-600 w-[7px] h-[7px] rounded absolute top-4 left-0 animate-pulse"></span>
      </div>
    </div>
  );
};

export default Header;
