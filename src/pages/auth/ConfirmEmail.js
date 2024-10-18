import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAuth } from "../../contexts/AuthContext";
import BackButton from "../../components/common/BackButton";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/authSlice";
import axios from "axios";
import { BACKEND_PATH } from "../../constants/config";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { confirmemail, userId } = useAuth();
  const [count, setCount] = useState(120);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    let timer;
    if (count > 0) {
      const timerFunc = () => {
        setCount((prevCount) => prevCount - 1);
      };
      timer = setInterval(timerFunc, 1000);
    }
    return () => clearInterval(timer);
  }, [count]);

  useEffect(() => {
    if (count === 0) {
      setReload(true);
    }
  }, [count]);

  useEffect(() => {
    if (!confirmemail) navigate("/");
  }, [confirmemail, navigate]);

  const handleSendagain = useCallback(() => {
    setCount(120);
    setReload(false);
  }, []);

  const handleSignin = useCallback(() => {
    (async () => {
      try {
        await axios.post(`${BACKEND_PATH}/user/email?userId=${userId}`, {
          email: confirmemail,
        });
        dispatch(
          updateUser([
            { key: "email", value: confirmemail },
            { key: "isAuthenticated", value: true },
          ])
        );
        navigate("/face-upload");
      } catch (error) {
        console.log(error);
      }
    })();
  }, [navigate, dispatch, confirmemail, userId]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <div
          className={classNames("flex justify-center", {
            "text-red-600": count < 60,
          })}
        >
          0{Math.floor(count / 60)}:{count % 60 < 10 && "0"}
          {count % 60}
        </div>
        <div className="flex justify-center">
          Check your <b className="mx-1">{confirmemail}</b> inbox
        </div>
        <div className="flex justify-center gap-2">
          <input className="border w-10" maxLength={1} disabled={reload} />
          <input className="border w-10" maxLength={1} disabled={reload} />
          <input className="border w-10" maxLength={1} disabled={reload} />
          <input className="border w-10" maxLength={1} disabled={reload} />
        </div>
        <div className="flex justify-between">
          <BackButton />
          <div className="flex gap-2">
            {reload && (
              <button className="px-1 border" onClick={handleSendagain}>
                Send again
              </button>
            )}
            <button
              disabled={reload}
              className="px-1 border"
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
