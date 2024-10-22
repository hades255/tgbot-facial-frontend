import React, { useEffect, useState, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { initBackButton } from "@telegram-apps/sdk";

import store from "./redux/store";
import { AuthProvider } from "./contexts/AuthContext";
import { SoundProvider } from "./contexts/SoundContext";
import "./App.css";
import Init from "./components/init";
import Router from "./router";
import ToastContainer from "./components/common/toast";
import Header from "./components/header";
import Navbar from "./components/navbar";

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
          <Header />
          <Suspense fallback={<div className=""></div>}>
            <Router />
          </Suspense>
          <Navbar />
          <Init params={str} />
          <ToastContainer />
        </SoundProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
