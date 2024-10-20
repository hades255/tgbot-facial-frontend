import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BACKEND_PATH } from "../../constants/config";
import { useAuth } from "../../contexts/AuthContext";
import moment from "moment";
import { STAKE_STATUS } from "../../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { addToast } from "../../redux/toastSlice";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/authSlice";

const StakeHistory = ({
  refresh,
  refreshHistory,
  max = 100,
  cancel = true,
}) => {
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const [stakes, setStakes] = useState([]);
  const [showC, setShowC] = useState(false);

  const reload = useCallback(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/stake?userId=${userId}&max=${max}`
        );
        setStakes(response.data.stakes);
      } catch (error) {
        console.log(error);
      }
    })();
    if (refreshHistory) refreshHistory(false);
  }, [userId, refreshHistory, max]);

  const handleCancel = useCallback(
    (id) => {
      (async () => {
        try {
          const response = await axios.post(`${BACKEND_PATH}/stake/cancel`, {
            id,
          });
          dispatch(
            updateUser([
              { key: "point", value: response.data.point },
              { key: "token", value: response.data.token },
            ])
          );
          dispatch(
            addToast({
              message: `Stake canceled.`,
              type: "success",
            })
          );
          reload();
        } catch (error) {
          console.log(error);
        }
      })();
    },
    [reload, dispatch]
  );

  useEffect(() => {
    if (refresh) {
      reload();
    }
  }, [reload, refresh]);

  const handleShowCanceled = useCallback(() => setShowC(!showC), [showC]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-end">
        <button
          className="text-sm text-white underline"
          onClick={handleShowCanceled}
        >
          {showC ? "Hide" : "Show"} Canceled Stakes
        </button>
      </div>
      {stakes && stakes.length ? (
        stakes.map((item, index) => (
          <StakeItem
            stake={item}
            key={index}
            cancel={cancel}
            onCancel={handleCancel}
            showC={showC}
          />
        ))
      ) : (
        <div className="flex justify-center text-gray-300 text-sm">
          No stake records
        </div>
      )}
    </div>
  );
};

export default StakeHistory;

const StakeItem = ({ stake, cancel, onCancel, showC }) => {
  const handleClick = useCallback(() => onCancel(stake._id), [onCancel, stake]);

  if (!showC && stake.status === 4) return <></>;

  return (
    <div className="flex justify-between text-white items-baseline relative">
      <div className="w-full flex flex-col font-semibold">
        <div className="flex gap-2">
          <div className="w-2/3 flex items-center gap-1">
            <span>{stake.amount}</span>
            <span className="text-xs text-gray-200">
              {["$SELFIE", "TOKEN"][stake.unit]}
            </span>
          </div>
          <div className="w-1/3">
            {Math.round(stake.profit * 100 * 1000) / 1000}%
          </div>
        </div>
        <div className="text-gray-400 text-xs font-semibold flex gap-1">
          <span>{moment(stake.createdAt).format("MMM DD, YYYY")}</span>
          <span className="">-</span>
          <span>{moment(stake.end).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <div className="min-w-20 w-20 text-gray-300 text-sm capitalize font-bold flex justify-end">
        {STAKE_STATUS[stake.status]}
      </div>
      {cancel || stake.status !== 4 && (
        <div
          className="absolute bottom-0 right-0 cursor-pointer"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faCancel} color="red" />
        </div>
      )}
    </div>
  );
};
