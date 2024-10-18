import React, { useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import classNames from "classnames";

const InviteButton = ({ classnames = "", title = "Invite friends" }) => {
  const { userId } = useAuth();

  const message = useMemo(
    () =>
      `https://t.me/anom_invaders_bot/ANOM_Invaders?startapp=linkCode_${userId}\nLet's race! Predict Ethereum's price and rack up points`,
    [userId]
  );
  const encodedMessage = useMemo(() => encodeURIComponent(message), [message]);

  return (
    <a
      href={`https://telegram.me/share/url?url=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames("", classnames)}
    >
      {title}
    </a>
  );
};

export default InviteButton;
