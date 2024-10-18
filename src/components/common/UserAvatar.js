import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const UserAvatar = ({
  avatar,
  width = 48,
  height = 48,
  className = "rounded-[24px] border",
}) => {
  return (
    <>
      {avatar ? (
        <img
          alt="user"
          src={avatar}
          width={width}
          height={height}
          className={className}
        />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}
    </>
  );
};

export default UserAvatar;
