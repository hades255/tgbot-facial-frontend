import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import WithAuth from "../components/layouts/WithAuth";

const Home = lazy(() => import("../pages/Home"));
const Refer = lazy(() => import("../pages/Refer"));
const Convert = lazy(() => import("../pages/Convert"));
const Stake = lazy(() => import("../pages/Stake"));
const Signin = lazy(() => import("../pages/auth/Signin"));
const ConfirmEmail = lazy(() => import("../pages/auth/ConfirmEmail"));
const FaceUpload = lazy(() => import("../pages/face/Upload"));

const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/email-confirm" element={<ConfirmEmail />} />
      <Route path="/face-upload" element={<FaceUpload />} />
      <Route path="/" element={WithAuth(Home)()} />
      <Route path="/refer" element={WithAuth(Refer)()} />
      <Route path="/convert" element={WithAuth(Convert)()} />
      <Route path="/stake" element={WithAuth(Stake)()} />
    </Routes>
  );
};

export default Router;
