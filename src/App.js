import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import { AuthProvider } from "./contexts/AuthContext";
import { SoundProvider } from "./contexts/SoundContext";
import "./App.css";
import Init from "./components/init";

const Home = lazy(() => import("./pages/Home"));

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Init params={str} />
            </Routes>
          </Suspense>
        </SoundProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
