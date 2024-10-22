import React from "react";
import BonusByRefer from "../components/refer/BonusByRefer";
import InviteButton from "../components/refer/InviteButton";
import CopyBtn from "../components/refer/CopyBtn";
import Friends from "../components/refer/Friends";
import Navbar from "../components/navbar";
import Header from "../components/header";

const Refer = () => {
  return (
    <>
      <Header />
      <div className="p-8 flex flex-col gap-2">
        <BonusByRefer />
        <div className="flex justify-center gap-2">
          <InviteButton classnames="border flex justify-center w-40 px-2 py-1 text-white" />
          <CopyBtn classnames="border rounded-lg p-1 text-white" />
        </div>
        <Friends />
      </div>
      <Navbar />
    </>
  );
};

export default Refer;
