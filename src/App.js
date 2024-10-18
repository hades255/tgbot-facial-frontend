import React, { useEffect, useState, Suspense } from "react";
import { Provider } from "react-redux";

import store from "./redux/store";
import { AuthProvider } from "./contexts/AuthContext";
import { SoundProvider } from "./contexts/SoundContext";
import "./App.css";
import Init from "./components/init";
import Router from "./router";
import ToastContainer from "./components/common/toast";

function App() {
  const [str, setStr] = useState(null);

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
          <Suspense fallback={<div className=""></div>}>
            <Router />
          </Suspense>
          <Init params={str} />
          <ToastContainer />
        </SoundProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
