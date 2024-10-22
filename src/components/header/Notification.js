import React, { useCallback, useEffect, useRef, useState } from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_PATH } from "../../constants/config";
import { removeNewNotifications } from "../../redux/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const newNotifications = useSelector(
    (state) => state.notification.newNotifications
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = useCallback(
    (id) => {
      (async () => {
        try {
          await axios.post(`${BACKEND_PATH}/notification/check`, {
            id,
          });
          dispatch(removeNewNotifications(id));
        } catch (error) {
          console.log(error);
        }
      })();
    },
    [dispatch]
  );

  return (
    <>
      <div className="relative inline-block" ref={dropdownRef}>
        <div
          onClick={toggleDropdown}
          className="w-6 h-6 flex justify-center items-center bg-white rounded-[12px] relative cursor-pointer"
        >
          <FontAwesomeIcon icon={faBell} />
          {newNotifications && newNotifications.length > 0 && (
            <span className="bg-red-600 w-[7px] h-[7px] rounded absolute top-4 left-0 animate-pulse"></span>
          )}
        </div>
        {isOpen && (
          <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-30">
            <div className="px-4 pt-2 pb-1 text-sm text-gray-700">
              <p className="font-bold">
                {newNotifications && newNotifications.length} New Notifications
              </p>
            </div>
            <div>
              {newNotifications &&
                newNotifications.map(
                  (item, index) =>
                    index < 4 && (
                      <NotificationItem
                        noti={item}
                        key={index}
                        onClick={handleClick}
                      />
                    )
                )}
              <div className="flex justify-end px-4">
                <Link
                  to={"/notifications"}
                  className="text-xs underline text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Show All
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;

const NotificationItem = ({ noti, onClick }) => {
  const handleClick = useCallback(() => onClick(noti._id), [noti, onClick]);

  return (
    <div
      onClick={handleClick}
      className="block px-2 py-2 text-gray-700 hover:bg-gray-100 text-nowrap overflow-hidden shadow-lg"
      dangerouslySetInnerHTML={{ __html: noti.message }}
    ></div>
  );
};
