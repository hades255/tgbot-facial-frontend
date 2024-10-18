import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/authSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("montgasam@gmail.com");

  const handleChangeEmailInput = useCallback(
    ({ target: { value } }) => setEmail(value),
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUser([{ key: "confirmemail", value: email }]));
      // navigate("/email-confirm");
      navigate("/face-upload");
    },
    [navigate, dispatch, email]
  );

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <form
          method="post"
          action="/"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <input
            className="border w-full"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmailInput}
          />
          <button type="submit" className="w-full border">
            Sign in
          </button>
        </form>
        {/* <hr />
        <button className="w-full border">Continue with Gmail</button> */}
      </div>
    </div>
  );
};

export default Signin;
