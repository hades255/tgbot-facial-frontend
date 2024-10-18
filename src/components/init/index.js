import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { login } from "../../redux/authSlice";
import { useAuth } from "../../contexts/AuthContext";
import { BACKEND_PATH } from "../../constants/config";
import { queryStringToObject } from "../../helper/func";

const Init = ({ params }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  const params_ = useMemo(() => queryStringToObject(params), [params]);

  useEffect(() => {
    if (isAuthenticated || !params || !params_.user) return;
    const userId = params_.user.id;
    const username = params_.user.username;
    const name = params_.user.first_name + " " + params_.user.last_name;
    let refer = queryParams.get("refer");
    if (params_.start_param) {
      refer = params_.start_param.toString().substring(9);
    }
    if (userId) {
      (async () => {
        try {
          const response = await axios.get(
            `${BACKEND_PATH}/user?userId=${userId}&name=${name}&username=${username}&refer=${refer}`
          );
          console.log(response.data);
          const user = response.data.user;
          // const bonus = response.data.bonus;
          dispatch(login({ ...user, userId, name, username }));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [queryParams, params, params_, dispatch, isAuthenticated]);

  return <></>;
};

export default Init;
