import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import BonusByRefer from "../components/refer/BonusByRefer";
import Friends from "../components/home/Friends";
import { Link } from "react-router-dom";
import Convertistory from "../components/convert/Convertistory";
import StakeHistory from "../components/stake/StakeHistory";
import Profile from "../components/home/Header";

const Home = () => {
  return (
    <>
      <div>
        <Profile />
        <div className="bg-[#F2FAFA] flex flex-col gap-2 rounded-t-[16px] px-4 pt-8 pb-24">
          <div className="flex gap-2">
            <Link
              to={"/refer"}
              className="w-1/2 bg-[#FFFFFF] hover:bg-[#FFFFFFF0] transition-colors rounded-lg p-4 shadow-[0_2px_4px_#00000040] relative"
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
              className="w-1/2 bg-[#FFFFFF] hover:bg-[#FFFFFFF0] transition-colors rounded-lg p-4 shadow-[0_2px_4px_#00000040] relative"
            >
              <img
                alt="swap"
                src="/swap.png"
                width={90}
                className="opacity-50"
              />
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
              <Link to={"/stake"} className="w-6 h-6">
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
    </>
  );
};

export default Home;
