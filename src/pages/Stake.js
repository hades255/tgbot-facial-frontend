import React, { useCallback, useState } from "react";
import StakeForm from "../components/stake/StakeForm";
import StakeHistory from "../components/stake/StakeHistory";
import { useAuth } from "../contexts/AuthContext";

const Stake = () => {
  const { point, token } = useAuth();
  const [refresh, setRefresh] = useState(true);

  const handleRefreshHistory = useCallback((param) => {
    setRefresh(param);
  }, []);

  return (
    <>
      <div className="p-8 pb-24 flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-1/2 bg-[#FFFFFF50] rounded-lg p-4 shadow-inner flex flex-col gap-2">
            <div className="flex justify-center items-baseline gap-2">
              <div className="text-xs font-semibold text-gray-100">
                $SELFIE:
              </div>
              <div className="font-bold text-white">{point}</div>
            </div>
            <div className="w-32 bg-white h-4 rounded-lg relative p-[2px]">
              <div
                className="absolute left-[2px] top-[2px] h-3 bg-progress-bar rounded-lg -z-0 text-[11px] flex justify-center items-center font-bold text-white"
                style={{ width: (124 * (point >= 2000 ? 2000 : point)) / 2000 }}
              >
                {point >= 2000 && "Stake Available"}
              </div>
              {point < 2000 && (
                <div
                  className="w-full h-full text-[11px] flex justify-start items-center font-bold text-gray-400 text-nowrap overflow-hidden"
                  style={{ paddingLeft: (124 * point) / 2000 }}
                >
                  {2000 - point} $SELFIEs Needed
                </div>
              )}
            </div>
          </div>
          <div className="w-1/2 bg-[#FFFFFF50] rounded-lg p-4 shadow-inner flex flex-col gap-2">
            <div className="flex justify-center items-baseline gap-2">
              <div className="text-xs font-semibold text-gray-100">TOKEN:</div>
              <div className="font-bold text-white">{token}</div>
            </div>
            <div className="w-32 bg-white h-4 rounded-lg relative p-[2px]">
              <div
                className="absolute left-[2px] top-[2px] h-3 bg-progress-bar rounded-lg -z-0 text-[11px] flex justify-center items-center font-bold text-white"
                style={{ width: (124 * (token >= 20 ? 20 : token)) / 20 }}
              >
                {token >= 20 && "Stake Available"}
              </div>
              {token < 20 && (
                <div
                  className="w-full h-full text-[11px] flex justify-start items-center font-bold text-gray-400 text-nowrap overflow-hidden"
                  style={{ paddingLeft: (124 * token) / 20 }}
                >
                  {20 - token} TOKENs Needed
                </div>
              )}
            </div>
          </div>
        </div>
        <StakeForm refreshHistory={handleRefreshHistory} />
        <div className="border p-8 rounded-lg">
          <StakeHistory
            refresh={refresh}
            refreshHistory={handleRefreshHistory}
          />
        </div>
      </div>
    </>
  );
};

export default Stake;
