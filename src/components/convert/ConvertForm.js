import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BACKEND_PATH } from "../../constants/config";
import { addToast } from "../../redux/toastSlice";
import { updateUser } from "../../redux/authSlice";
import { useAuth } from "../../contexts/AuthContext";

const ConvertForm = ({ refreshHistory }) => {
  const dispatch = useDispatch();
  const user = useAuth();

  const [input, setInput] = useState(100);

  const handleInputChange = useCallback(
    ({ target: { value } }) => setInput(value),
    []
  );

  const handleClickMax = useCallback(() => setInput(user.point), [user]);

  const profit = useMemo(
    () =>
      input >= 10000
        ? 0.4
        : input >= 5000
        ? 0.3
        : input >= 2000
        ? 0.2
        : input >= 1000
        ? 0.1
        : 0.05,
    [input]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (input > user.point || input < 100) {
        dispatch(
          addToast({
            message: `Invalid valance.`,
            type: "warn",
          })
        );
        return;
      }
      (async () => {
        try {
          const response = await axios.post(
            `${BACKEND_PATH}/convert?userId=${user.userId}`,
            { input, profit }
          );
          dispatch(
            updateUser([
              { key: "point", value: response.data.point },
              { key: "token", value: response.data.token },
            ])
          );
          dispatch(
            addToast({
              message: `Convert successfull.`,
              type: "success",
            })
          );
          setInput(0);
          refreshHistory(true);
        } catch (error) {
          console.log(error);
          dispatch(
            addToast({
              message: error.message,
              type: "error",
            })
          );
        }
      })();
    },
    [input, profit, user, dispatch, refreshHistory]
  );

  return (
    <div className="border p-8 rounded-lg">
      <div className="text-xs mb-4 text-white">
        {user.point} <span className="font-semibold">$SELFIEs</span> are convert
        available
      </div>
      <form
        method="post"
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div className="text-white text-sm">
          Convert <span className="font-semibold">$SELFIEs</span>
        </div>
        <div className="relative w-full">
          <input
            disabled={user.point < 100}
            type="number"
            step={100}
            min={100}
            className="w-full py-1 ps-4 pe-10 rounded"
            name="convert"
            value={input}
            onChange={handleInputChange}
          />
          <div className="absolute right-2 top-0 h-full flex justify-center items-center">
            <span
              className="text-xs font-bold cursor-pointer text-gray-500"
              onClick={handleClickMax}
            >
              max
            </span>
          </div>
        </div>
        <div className="text-white text-sm">
          To <span className="font-semibold">TOKENs</span>
        </div>
        <input
          type="number"
          className="w-full py-1 px-4 rounded"
          readOnly
          value={input / 100}
        />
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="border rounded px-2 text-white font-bold"
          >
            Convert
          </button>
          <div className="flex items-center text-xs font-semibold text-red-300">
            get {profit * 100}% profits
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="px-1 cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConvertForm;
