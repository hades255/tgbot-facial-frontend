import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { BACKEND_PATH } from "../../constants/config";

const Friends = () => {
  const { userId } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/referral/frens?userId=${userId}`
        );
        if (response.data.frens)
          setUsers(
            response.data.frens
              .filter((item) => item.userId !== userId)
              .filter((_, index) => index < 5)
          );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <div className="min-h-20 flex flex-col">
      {users && users.length ? (
        users.map((item, index) => (
          <div
            key={index}
            className={`py-3 px-3 flex justify-between ${
              item.chatId.toString() === userId.toString()
                ? "bg-[#263f68] rounded-md"
                : ""
            }`}
          >
            <div className="flex w-52 max-w-52">
              <div className="w-10 text-sm backdrop-blur-lg text-white"></div>
              <div className="text-sm backdrop-blur-lg text-white">
                {item.name}
              </div>
            </div>
            <div className="text-sm backdrop-blur-lg text-slate-400">
              {Math.round(item.bonus).toLocaleString()} $SELFIE
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center text-sm font-semibold text-gray-400">
          No Refers
        </div>
      )}
    </div>
  );
};

export default Friends;
