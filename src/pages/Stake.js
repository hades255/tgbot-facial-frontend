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
    <div className="p-8 flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="w-1/2 bg-[#FFFFFF50] rounded-lg p-4 shadow-inner flex justify-center items-baseline gap-1">
          <div className="text-xs font-semibold text-gray-100">$SELFIE:</div>
          <div className="font-bold text-white">{point}</div>
        </div>
        <div className="w-1/2 bg-[#FFFFFF50] rounded-lg p-4 shadow-inner flex justify-center items-baseline gap-1">
          <div className="text-xs font-semibold text-gray-100">TOKEN:</div>
          <div className="font-bold text-white">{token}</div>
        </div>
      </div>
      <StakeForm refreshHistory={handleRefreshHistory} />
      <div className="border p-8 rounded-lg">
        <StakeHistory refresh={refresh} refreshHistory={handleRefreshHistory} />
      </div>
    </div>
  );
};

export default Stake;
