import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { addToast } from "../../redux/toastSlice";
import classNames from "classnames";

const CopyBtn = ({ title = "Copy", classnames = "" }) => {
  const { userId } = useAuth();
  const dispatch = useDispatch();

  const inviteLink = useMemo(
    () =>
      `https://t.me/anom_invaders_bot/ANOM_Invaders?startapp=linkCode_${userId}`,
    [userId]
  );

  const copyToClipboard = useCallback(() => {
    const tempInput = document.createElement("input");
    tempInput.value = `${inviteLink}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    dispatch(
      addToast({
        message: "Your Invite URL is now copied to your clipboard!",
        type: "success",
      })
    );
  }, [inviteLink, dispatch]);

  return (
    <button onClick={copyToClipboard} className={classNames("", classnames)}>
      {title}
    </button>
  );
};

export default CopyBtn;
