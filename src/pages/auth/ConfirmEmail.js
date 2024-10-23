import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAuth } from "../../contexts/AuthContext";
import BackButton from "../../components/common/BackButton";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/authSlice";
import axios from "axios";
import { BACKEND_PATH } from "../../constants/config";
import { addToast } from "../../redux/toastSlice";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { confirmemail, userId } = useAuth();
  const [count, setCount] = useState(120);
  const [reload, setReload] = useState(false);
  const [input, setInput] = useState({ a: "", b: "", c: "", d: "" });

  const inputa = useRef(null);
  const inputb = useRef(null);
  const inputc = useRef(null);
  const inputd = useRef(null);

  const handleInputChange = useCallback(
    ({ target: { name, value } }) => {
      setInput({ ...input, [name]: value });
      if (name === "a" && inputb.current) inputb.current.focus();
      if (name === "b" && inputc.current) inputc.current.focus();
      if (name === "c" && inputd.current) inputd.current.focus();
    },
    [input]
  );

  useEffect(() => {
    let timer;
    if (count > 0) {
      const timerFunc = () => {
        setCount((prevCount) => prevCount - 1);
      };
      timer = setInterval(timerFunc, 1000);
    }
    if (count === 0) {
      setReload(true);
    }
    return () => clearInterval(timer);
  }, [count]);

  useEffect(() => {
    if (!confirmemail) navigate("/");
  }, [confirmemail, navigate]);

  const handleSendagain = useCallback(async () => {
    await axios.post(`${BACKEND_PATH}/user/email?userId=${userId}`, {
      email: confirmemail,
    });
    setCount(120);
    setReload(false);
  }, [confirmemail, userId]);

  const handleSignin = useCallback(() => {
    if (input.a && input.b && input.c && input.d) {
      (async () => {
        try {
          const response = await axios.post(
            `${BACKEND_PATH}/user/confirmemail?userId=${userId}`,
            {
              email: confirmemail,
              code: input.a + input.b + input.c + input.d,
            }
          );
          if (response.data.msg === "ok") {
            dispatch(
              updateUser([
                { key: "email", value: confirmemail },
                { key: "isAuthenticated", value: true },
              ])
            );
            dispatch(
              addToast({
                message: `Welcome ${confirmemail}!`,
                type: "info",
              })
            );
            navigate("/face-upload");
          }
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
    }
  }, [navigate, dispatch, confirmemail, userId, input]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <div
          className={classNames("flex justify-center text-[24px] font-bold", {
            "text-red-600": count < 60,
            "text-white": count > 60,
          })}
        >
          0{Math.floor(count / 60)}:{count % 60 < 10 && "0"}
          {count % 60}
        </div>
        <div className="flex justify-center text-white">
          Check your <b className="mx-1">{confirmemail}</b> inbox
        </div>
        <div className="flex justify-center gap-2">
          <input
            className="border w-10 rounded px-3 bg-transparent text-white"
            maxLength={1}
            disabled={reload}
            ref={inputa}
            name="a"
            value={input.a}
            onChange={handleInputChange}
          />
          <input
            className="border w-10 rounded px-3 bg-transparent text-white"
            maxLength={1}
            disabled={reload}
            ref={inputb}
            name="b"
            value={input.b}
            onChange={handleInputChange}
          />
          <input
            className="border w-10 rounded px-3 bg-transparent text-white"
            maxLength={1}
            disabled={reload}
            ref={inputc}
            name="c"
            value={input.c}
            onChange={handleInputChange}
          />
          <input
            className="border w-10 rounded px-3 bg-transparent text-white"
            maxLength={1}
            disabled={reload}
            ref={inputd}
            name="d"
            value={input.d}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between">
          <BackButton />
          <div className="flex gap-2">
            {reload && (
              <button
                className="border rounded px-2 text-white font-bold"
                onClick={handleSendagain}
              >
                Send again
              </button>
            )}
            <button
              disabled={reload}
              className="border rounded px-2 text-white font-bold"
              onClick={handleSignin}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
