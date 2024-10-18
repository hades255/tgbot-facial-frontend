import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Signin from "../pages/auth/Signin";
import ConfirmEmail from "../pages/auth/ConfirmEmail";
import FaceUpload from "../pages/face/Upload";
import Refer from "../pages/Refer";
import WithAuth from "../components/layouts/WithAuth";
const Home = lazy(() => import("../pages/Home"));

const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/email-confirm" element={<ConfirmEmail />} />
      <Route path="/face-upload" element={<FaceUpload />} />
      <Route path="/" element={WithAuth(Home)()} />
      <Route path="/refer" element={WithAuth(Refer)()} />
    </Routes>
  );
};

export default Router;
