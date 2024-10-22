import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_PATH } from "../constants/config";
import { useAuth } from "../contexts/AuthContext";
import BackButton from "../components/common/BackButton";
import moment from "moment";
import classNames from "classnames";

const Notifications = () => {
  const { userId } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/notification?userId=${userId}`
        );
        if (response.data && response.data.length) {
          setNotifications(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <>
      <div className="p-8 flex flex-col gap-2">
        {notifications.length > 0 &&
          notifications.map((item, index) => (
            <NotificationItem noti={item} key={index} />
          ))}
        {notifications.length === 0 && (
          <div className="flex justify-center text-white">
            No Notifications
            <BackButton classnames={"ml-1 border-0 underline text-xs"} />
          </div>
        )}
      </div>
    </>
  );
};

export default Notifications;

const NotificationItem = ({ noti }) => {
  return (
    <div
      className={classNames(
        "flex justify-between shadow-lg rounded-lg px-4 pt-2 pb-24 items-end",
        {
          "bg-notify-item": noti.status === 1,
          "bg-notify-new-item": noti.status === 0,
        }
      )}
    >
      <div
        dangerouslySetInnerHTML={{ __html: noti.message }}
        className="text-white"
      ></div>
      <div className="text-xs text-gray-300">
        {moment(noti.updatedAt).fromNow()}
      </div>
    </div>
  );
};
