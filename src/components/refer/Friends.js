import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { BACKEND_PATH } from "../../constants/config";

const Friends = () => {
  const { userId, name, point } = useAuth();
  const [users, setUsers] = useState([]);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/referral/frens?userId=${userId}`
        );
        setUsers(response.data.frens || []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (users)
      setRank(
        users.findIndex((item) => item.chatId.toString() === userId.toString())
      );
  }, [users, userId]);

  return (
    <div className="flex flex-col border rounded p-1 bg-[#6b728040]">
      <div className="min-h-44 flex flex-col">
        <div className="flex justify-between mx-3">
          <span className="text-slate-500 text-sm">
            {(users.length || 0).toLocaleString()} Refers
          </span>
          <span className="text-slate-500 text-sm">Total $SELFIE earned</span>
        </div>
        <div className="flex flex-col pt-2">
          {rank !== null && rank > 10 && (
            <div className="py-3 px-3 flex justify-between bg-[#263f68] rounded-md">
              <div className="flex">
                <div className="w-14 text-sm backdrop-blur-lg text-white">
                  10+
                </div>
                <div className="text-sm backdrop-blur-lg text-white">
                  {name}
                </div>
              </div>
              <div className="flex">
                <span className="text-sm backdrop-blur-lg text-slate-400">
                  {point.toLocaleString()} $SELFIE
                </span>
              </div>
            </div>
          )}
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
                  <div className="w-10 text-sm backdrop-blur-lg text-white">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : `#${index + 1}`}
                  </div>
                  <div className="text-sm backdrop-blur-lg text-white">
                    {item.name}
                  </div>
                </div>
                <div className="text-sm backdrop-blur-lg text-slate-400">
                  🚀 {Math.round(item.point).toLocaleString()} $SELFIE
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center">No Refers</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
