import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { BACKEND_PATH } from "../../constants/config";
import { addNewNotifications } from "../../redux/notificationSlice";

const NewNotificationTimer = () => {
  const dispatch = useDispatch();
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;
    const timerFunc = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/notification/check?userId=${userId}`
        );
        if (response.data && response.data.length) {
          dispatch(addNewNotifications(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    timerFunc();
    const timer = setInterval(timerFunc, 30000);
    return () => clearInterval(timer);
  }, [dispatch, userId]);

  return <></>;
};

export default NewNotificationTimer;
