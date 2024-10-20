import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_PATH } from "../../constants/config";
import { useAuth } from "../../contexts/AuthContext";
import moment from "moment";

const Convertistory = ({ refresh, refreshHistory, max = 100 }) => {
  const { userId } = useAuth();
  const [converts, setConverts] = useState([]);

  useEffect(() => {
    if (refresh) {
      (async () => {
        try {
          const response = await axios.get(
            `${BACKEND_PATH}/convert?userId=${userId}&max=${max}`
          );
          setConverts(response.data.converts);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    if (refreshHistory) refreshHistory(false);
  }, [userId, refreshHistory, refresh, max]);

  return (
    <div className="flex flex-col gap-1">
      {converts && converts.length ? (
        converts.map((item, index) => (
          <ConvertItem convert={item} key={index} />
        ))
      ) : (
        <div className="flex justify-center text-gray-300 text-sm">
          No convert records
        </div>
      )}
    </div>
  );
};

export default Convertistory;

const ConvertItem = ({ convert }) => {
  return (
    <div className="flex justify-between text-white items-center">
      <div className="flex flex-col font-semibold">
        <div>
          {convert.amount} $SELFIE to {convert.amount / 100} tokens
        </div>
        <div className="text-gray-400 text-xs font-semibold">
          {moment(convert.createdAt).format("MMM DD, YYYY, hh:mm A")}
        </div>
      </div>
      <div className="text-gray-300 text-sm">Profit: {convert.amount * convert.profit}</div>
    </div>
  );
};
