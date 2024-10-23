import React, { useEffect, useState, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { initBackButton } from "@telegram-apps/sdk";
import { GoogleOAuthProvider } from "@react-oauth/google";

import store from "./redux/store";
import { AuthProvider } from "./contexts/AuthContext";
import { SoundProvider } from "./contexts/SoundContext";
import "./App.css";
import Init from "./components/init";
import Router from "./router";
import ToastContainer from "./components/common/toast";
import Header from "./components/header";
import Navbar from "./components/navbar";
import classNames from "classnames";

function App() {
  const location = useLocation();
  const [str, setStr] = useState(null);

  useEffect(() => {
    //  todo backbutton
    // return;
    const [backButton] = initBackButton();
    backButton.on("click", () => {
      window.history.back();
    });

    const updateBackButtonVisibility = () => {
      if (location.pathname === "/signin") {
        backButton.hide();
      } else {
        backButton.show();
      }
    };

    updateBackButtonVisibility();

    return () => {
      backButton.hide();
    };
  }, [location]);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initData;
      setStr(initData);
      window.Telegram.WebApp.setHeaderColor("#0f1f39");
    }
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <SoundProvider>
          <GoogleOAuthProvider clientId="539096811589-qf41loeea9l2vrv5d05jfr2s9ue5upf1.apps.googleusercontent.com">
            <Header />
            <Suspense fallback={<div className=""></div>}>
              <Router />
            </Suspense>
            <Navbar />
            <InitLoading />
            <ToastContainer />
          </GoogleOAuthProvider>
        </SoundProvider>
        <Init params={str} />
      </AuthProvider>
    </Provider>
  );
}

export default App;

const InitLoading = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 w-screen h-screen bg-init-loading z-50",
        { hidden: hide }
      )}
    ></div>
  );
};
