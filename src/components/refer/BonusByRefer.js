import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { BACKEND_PATH } from "../../constants/config";

const BonusByRefer = () => {
  const { userId } = useAuth();
  const [totalBonus, setTotalBonus] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/referral/bonus?userId=${userId}`
        );
        setTotalBonus(response.data.totalBonus || 0);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <>
      <div className="text-white text-sm">
        You've earned <span className="font-semibold">{totalBonus} $SELFIE</span> from
        your friends.
      </div>
    </>
  );
};

export default BonusByRefer;
