import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import AppleSignin from "react-apple-signin-auth";

import { updateUser } from "../../redux/authSlice";
import { useAuth } from "../../contexts/AuthContext";
import { BACKEND_PATH } from "../../constants/config";
import { addToast } from "../../redux/toastSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useAuth();

  const [email_, setEmail] = useState("montgasam@gmail.com");

  const handleChangeEmailInput = useCallback(
    ({ target: { value } }) => setEmail(value),
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // if (email && email === email_) {
      //   dispatch(updateUser([{ key: "isAuthenticated", value: true }]));
      //   navigate("/face-upload");
      //   return;
      // }
      (async () => {
        try {
          // await axios.post(`${BACKEND_PATH}/user/email?userId=${userId}`, {
          //   email: email_,
          // });
          dispatch(updateUser([{ key: "confirmemail", value: email_ }]));
          dispatch(
            addToast({
              message: `Verification code sent to ${email_}!`,
              type: "info",
            })
          );
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
    [navigate, dispatch, email_, userId]
  );

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <div className="flex justify-center items-center mt-16 gap-3">
        <div>
          <img
            alt="selfie icon"
            src="/icon.png"
            width={64}
            height={64}
            className="image-white"
          />
        </div>
        <div>
          <img
            alt="selfie title"
            src="/title.png"
            width={240}
            height={40}
            className="image-white"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center text-center flex-wrap text-[36px] text-white px-8 mb-10">
          <b className="mr-2">Wellness</b> begins with a
          <b className="ml-2">selfie</b>.
        </div>
        <AppleSignInButton />
        <SigninWithGoogle />
        <div className="mx-8 my-4 border"></div>
        <form
          method="post"
          action="/"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mb-4 px-8"
        >
          <input
            className="w-full py-1 px-4 rounded-lg bg-transparent border text-white"
            type="email"
            placeholder="Email"
            value={email_}
            onChange={handleChangeEmailInput}
          />
          <button
            type="submit"
            className="border rounded-lg px-2 py-1 bg-white font-bold"
          >
            Sign in with Email
          </button>
        </form>
        <div className="text-white px-8 text-xs text-center mb-12 font-[100]">
          By continuing, you agree to our{" "}
          <b className="underline">Terms of Service</b> and confirm that you
          have read our <b className="underline">Privacy Policy</b> including
          our <b className="underline">Cookie Policy</b>
        </div>
      </div>
    </div>
  );
};

export default Signin;

const SigninWithGoogle = () => {
  const handleLogin = async (response) => {
    console.log(response);
    // const token = response.tokenIdToken;
    // Send the token to the server to authenticate the user
    try {
      const response_ = await axios.post(
        `${BACKEND_PATH}/oauth/google-exchange-token`,
        {
          code: response.code,
        }
      );
      console.log(response_);
    } catch (error) {
      console.log(error);
    }
    // fetch("http://localhost:3001/exchange-token", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ code: response.code }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("Token received:", data);
    //     // Handle the token, e.g., store it in local storage
    //   });
  };

  return (
    <div className="mx-8">
      <GoogleLogin
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookieJar={false}
      />
    </div>
  );
};

const AppleSignInButton = () => {
  const handleSuccess = async (response) => {
    console.log(response);
    try {
      const response_ = await axios.post(
        `${BACKEND_PATH}/oauth/apple-exchange-token`,
        {
          code: response.code,
        }
      );
      console.log(response_);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-8">
      <AppleSignin
        authOptions={{
          clientId: "YOUR_CLIENT_ID",
          scope: "email",
          redirectURI: "http://localhost:3001/callback",
          usePopup: true,
        }}
        onSuccess={handleSuccess}
        onError={handleSuccess}
        uiType="light"
        className="w-full"
      />
    </div>
  );
};
