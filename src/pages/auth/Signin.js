import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/authSlice";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { BACKEND_PATH } from "../../constants/config";
import { addToast } from "../../redux/toastSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, userId } = useAuth();

  const [email_, setEmail] = useState("montgasam@gmail.com");

  const handleChangeEmailInput = useCallback(
    ({ target: { value } }) => setEmail(value),
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (email && email === email_) {
        navigate("/face-upload");
        return;
      }
      (async () => {
        try {
          // await axios.post(`${BACKEND_PATH}/user/email?userId=${userId}`, {
          //   email: email_,
          // });
          dispatch(
            addToast({
              message: `Verification code sent to ${email_}!`,
              type: "info",
            })
          );
          dispatch(updateUser([{ key: "confirmemail", value: email_ }]));
          navigate("/email-confirm");
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
    },
    [navigate, dispatch, email_, email, userId]
  );

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        method="post"
        action="/"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <input
          className="w-full py-1 px-4 rounded"
          type="email"
          placeholder="Email"
          value={email_}
          onChange={handleChangeEmailInput}
        />
        <button
          type="submit"
          className="border rounded px-2 text-white font-bold"
        >
          Sign in
        </button>
      </form>
      {/* <hr />
        <button className="w-full border">Continue with Gmail</button> */}
    </div>
  );
};

export default Signin;
