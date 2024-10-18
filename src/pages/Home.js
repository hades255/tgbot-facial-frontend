import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_PATH } from "../constants/config";
import { useAuth } from "../contexts/AuthContext";
import UserAvatar from "../components/common/UserAvatar";
import BonusByRefer from "../components/refer/BonusByRefer";
import Friends from "../components/home/Friends";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useAuth();
  console.log(user);

  return (
    <div>
      <div className="m-8 flex flex-col gap-2">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 items-center">
            <div className="w-12 h-12 rounded-[24px] bg-gray-300 flex items-center justify-center">
              <UserAvatar avatar={user.avatar} />
            </div>
            <div className="flex flex-col justify-center">
              <span>Hi, {user.name}</span>
              <span className="underline text-xs">{user.username}</span>
            </div>
          </div>
          <div className="w-6 h-6 flex justify-center items-center bg-white rounded-[12px] relative">
            <FontAwesomeIcon icon={faBell} />
            <span className="bg-red-600 w-[7px] h-[7px] rounded absolute top-4 left-0"></span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-32 h-32 rounded-[64px] border flex justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="text-[24px]">
                <span className="font-bold text-white mr-1">{user.point}</span>
                $SELFIE
              </div>
              <div className="text-[16px]">
                <span className="font-bold text-white mr-1">{user.token}</span>
                tokens
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button className="border py-1 px-2 rounded-lg">
              Convert to token
            </button>
            <div className="text-sm">
              <span className="font-semibold mx-1">
                {Math.floor(user.point / 100) * 100}
              </span>
              $SELFIE to
              <span className="font-semibold mx-1">
                {Math.floor(user.point / 100)}
              </span>
              tokens
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F2FAFA] flex flex-col gap-2 rounded-t-[16px] p-4 ">
        <div>history</div>
        <div className="flex gap-2">
          <div className="w-1/2 bg-white rounded-lg p-4 shadow-inner flex flex-col">
            <span className="font-bold text-sm">Refer a friend</span>
            <span className="text-xs font-semibold">Refer a friend to get free $SELFIE!</span>
            <img alt="announcement" src="/announcement.png" width={100} />
          </div>
          <div className="w-1/2 bg-white rounded-lg p-4 shadow-inner flex flex-col">
            <span className="font-bold text-sm">Stake your $SELFIE</span>
            <span className="text-xs font-semibold">Stake your facial data & earn free $SELFIE!</span>
            <img alt="swap" src="/swap.png" width={90} />
          </div>
        </div>
        <div className="bg-gray-400 rounded-lg p-4">
          <div className="flex justify-between items-center border-b">
            <BonusByRefer />
            <Link to={"/refer"}>
              <FontAwesomeIcon icon={faRightLong} size="sm" color="white" />
            </Link>
          </div>
          <Friends />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
