import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@telegram-apps/sdk";

const ConfirmEmail = () => {
  const navigate = useNavigate();

  const { confirmemail } = useAuth();
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
  }, []);


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
          <input className="border w-10" maxLength={1} />
          <input className="border w-10" maxLength={1} />
          <input className="border w-10" maxLength={1} />
          <input className="border w-10" maxLength={1} />
        </div>
        <div className="flex justify-between">
          <BackButton />
          {reload && <button onClick={handleSendagain}>Send again</button>}
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
