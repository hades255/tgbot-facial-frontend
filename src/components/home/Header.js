import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { formatNumber } from "../../helper/func";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useAuth();

  return (
    <div className="m-8 mt-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="w-32 h-32 rounded-[64px] border flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div>
              <span className="text-[24px] font-bold text-white mr-1">
                {formatNumber(user.point)}
              </span>
              <span className="text-gray-200 text-xs font-semibold">
                $SELFIEs
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
          {user.point >= 1000 ? (
            <>
              <div className="flex flex-col items-center text-sm text-gray-300 font-semibold">
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
              </div>
              <Link
                to="/convert"
                className="border py-1 px-2 rounded-lg text-white text-sm font-semibold"
              >
                Convert to token
              </Link>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center text-sm text-gray-300 font-semibold">
                <div>
                  Need
                  <span className="font-bold mx-1">{1000 - user.point}</span>
                  $SELFIEs
                </div>
                <div>to convert available</div>
              </div>
              <div className="w-40 bg-white h-4 rounded-lg relative p-[2px]">
                <div
                  className="absolute left-[2px] top-[2px] h-3 bg-progress-bar rounded-lg"
                  style={{ width: (156 * user.point) / 1000 }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
