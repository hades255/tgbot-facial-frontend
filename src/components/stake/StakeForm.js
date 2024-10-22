import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_PATH } from "../../constants/config";
import { addToast } from "../../redux/toastSlice";
import { updateUser } from "../../redux/authSlice";
import { useAuth } from "../../contexts/AuthContext";
import moment from "moment";

const StakeForm = ({ refreshHistory }) => {
  const dispatch = useDispatch();
  const user = useAuth();

  const [input, setInput] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [minValue, setMinValue] = useState(2000);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSelectChange = useCallback(({ target: { value } }) => {
    setSelectedOption(Number(value));
    setMinValue(Number(value) === 1 ? 20 : 2000);
    setInput(0);
  }, []);

  const handleDateChange = useCallback(
    ({ target: { value } }) => setDate(value),
    []
  );

  const handleInputChange = useCallback(
    ({ target: { value } }) => setInput(value),
    []
  );

  const handleClickMax = useCallback(() => {
    setInput(user[selectedOption === 1 ? "token" : "point"]);
  }, [user, selectedOption]);

  const profit = useMemo(() => {
    const _input = input * (selectedOption === 1 ? 100 : 1);
    const a =
      _input >= 10000
        ? 0.15
        : _input >= 5000
        ? 0.08
        : _input >= 4000
        ? 0.05
        : _input >= 3000
        ? 0.04
        : 0.01;
    const diff = moment(date).diff(moment(), "days");
    const b =
      diff < 1
        ? 0
        : diff >= 60
        ? 0.7
        : diff >= 30
        ? 0.5
        : diff >= 20
        ? 0.4
        : diff >= 10
        ? 0.3
        : diff >= 5
        ? 0.1
        : diff >= 3
        ? 0.05
        : 0.01;
    return a * b;
  }, [input, date, selectedOption]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (
        profit === 0 ||
        input > user[selectedOption === 1 ? "token" : "point"]
      ) {
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
            `${BACKEND_PATH}/stake?userId=${user.userId}`,
            { amount: input, end: date, unit: selectedOption, profit }
          );
          dispatch(
            updateUser([
              { key: "point", value: response.data.point },
              { key: "token", value: response.data.token },
            ])
          );
          dispatch(
            addToast({
              message: `Stake successfull.`,
              type: "success",
            })
          );
          setInput(0);
          setDate(new Date().toISOString().split("T")[0]);
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
    [input, date, selectedOption, profit, user, dispatch, refreshHistory]
  );

  return (
    <div className="border p-8 rounded-lg">
      <form
        method="post"
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="w-full py-1 ps-4 rounded"
        >
          <option value={0}>$SELFIE</option>
          <option value={1}>TOKEN</option>
        </select>
        <div className="relative w-full">
          <input
            type="number"
            step={1}
            min={minValue}
            className="w-full py-1 ps-4 pe-10 rounded"
            name="stake"
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
        <input
          type="date"
          className="w-full py-1 ps-4 pe-1 rounded"
          value={date}
          onChange={handleDateChange}
        />
        <div className="text-white text-sm">
          Will get
          <span className="ml-1 font-semibold">
            {selectedOption === 1 ? "TOKENs" : "$SELFIEs"}
          </span>
        </div>
        <input
          type="number"
          className="w-full py-1 px-4 rounded"
          readOnly
          min={new Date().toISOString().split("T")[0]}
          value={Math.round(input * profit * 1000) / 1000}
        />
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="border rounded px-2 text-white font-bold"
          >
            Stake
          </button>
        </div>
      </form>
    </div>
  );
};

export default StakeForm;
