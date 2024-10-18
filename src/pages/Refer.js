import React from "react";
import BonusByRefer from "../components/refer/BonusByRefer";
import InviteButton from "../components/refer/InviteButton";
import CopyBtn from "../components/refer/CopyBtn";
import Friends from "../components/refer/Friends";

const Refer = () => {
  return (
    <div className="p-8 flex flex-col gap-2">
      <BonusByRefer />
      <div className="flex gap-2">
        <InviteButton classnames="border flex justify-center w-40 p-2" />
        <CopyBtn classnames="border rounded-lg p-2" />
      </div>
      <Friends />
    </div>
  );
};

export default Refer;
