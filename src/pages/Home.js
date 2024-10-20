import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_PATH } from "../constants/config";
import { useAuth } from "../contexts/AuthContext";
import UserAvatar from "../components/common/UserAvatar";
import BonusByRefer from "../components/refer/BonusByRefer";
import Friends from "../components/home/Friends";
import { Link } from "react-router-dom";
import { formatNumber } from "../helper/func";
import Convertistory from "../components/convert/Convertistory";
import StakeHistory from "../components/stake/StakeHistory";

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
            <div className="flex flex-col justify-center text-white font-semibold">
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
              <div>
                <span className="text-[24px] font-bold text-white mr-1">
                  {formatNumber(user.point)}
                </span>
                <span className="text-gray-200 text-xs font-semibold">
                  $SELFIE
                </span>
              </div>
              <div className="text-[16px]">
                <span className="font-bold text-white mr-1">
                  {formatNumber(user.token)}
                </span>
                <span className="text-gray-200 text-xs font-semibold">
                  tokens
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center text-sm text-gray-300 font-semibold">
              {user.point > 100 ? (
                <>
                  <div>
                    <span className="font-bold mx-1">
                      {Math.floor(user.point / 100) * 100}
                    </span>
                    $SELFIE to
                  </div>
                  <div>
                    <span className="font-bold mx-1">
                      {Math.floor(user.point / 100)}
                    </span>
                    tokens
                  </div>
                </>
              ) : (
                <>
                  <div>
                    Need
                    <span className="font-bold mx-1">{100 - user.point}</span>
                    $SELFIE
                  </div>
                  <div>to get 1 tokens</div>
                </>
              )}
            </div>
            <Link
              to="/convert"
              className="border py-1 px-2 rounded-lg text-white text-sm font-semibold"
            >
              Convert to token
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#F2FAFA] flex flex-col gap-2 rounded-t-[16px] p-4 pb-8">
        <div className="flex gap-2">
          <Link
            to={"/refer"}
            className="w-1/2 bg-white rounded-lg p-4 shadow-inner relative"
          >
            <img
              alt="announcement"
              src="/announcement.png"
              width={100}
              className="opacity-50"
            />
            <div className="flex flex-col absolute bottom-0 left-0 p-4 text-gray-800">
              <span className="font-bold text-sm">Refer a friend</span>
              <span className="text-xs font-semibold">
                Refer a friend to get free $SELFIE!
              </span>
            </div>
          </Link>
          <Link
            to={"/stake"}
            className="w-1/2 bg-white rounded-lg p-4 shadow-inner relative"
          >
            <img alt="swap" src="/swap.png" width={90} className="opacity-50" />
            <div className="flex flex-col absolute bottom-0 left-0 p-4 text-gray-800">
              <span className="font-bold text-sm">Stake your $SELFIE</span>
              <span className="text-xs font-semibold">
                Stake your facial data & earn free $SELFIE!
              </span>
            </div>
          </Link>
        </div>
        <div className="bg-custom-gradient rounded-lg p-4">
          <div className="flex justify-between items-center border-b">
            <BonusByRefer />
            <Link to={"/refer"}>
              <FontAwesomeIcon icon={faRightLong} size="sm" color="white" />
            </Link>
          </div>
          <Friends />
        </div>
        <div className="bg-custom-gradient rounded-lg p-4">
          <div className="flex justify-between items-center border-b">
            <div className="text-white text-sm">Stake</div>
            <Link to={"/stake"}>
              <FontAwesomeIcon icon={faRightLong} size="sm" color="white" />
            </Link>
          </div>
          <div className="min-h-20 flex flex-col">
            <StakeHistory
              max={5}
              refresh={true}
              refreshHistory={null}
              cancel={false}
            />
          </div>
        </div>
        <div className="bg-custom-gradient rounded-lg p-4">
          <div className="flex justify-between items-center border-b">
            <div className="text-white text-sm">Convert</div>
            <Link to={"/convert"}>
              <FontAwesomeIcon icon={faRightLong} size="sm" color="white" />
            </Link>
          </div>
          <div className="min-h-20 flex flex-col">
            <Convertistory max={5} refresh={true} refreshHistory={null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
