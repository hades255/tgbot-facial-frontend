import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import buttonSfx from "../../assets/audios/button.mp3";
import { usePlaySound } from "../../contexts/SoundContext";

const NavbarItem = ({ icon, url, title }) => {
  const navigate = useNavigate();
  const { sound } = usePlaySound();
  const [playButtonSfx] = useSound(buttonSfx, { soundEnabled: sound });

  const handleClick = useCallback(() => {
    playButtonSfx();
    navigate(url);
  }, [navigate, url, playButtonSfx]);

  return (
    <div
      className="flex justify-center items-center w-1/5 h-12 hover:cursor-pointer rounded shadow-navbar-item"
      onClick={handleClick}
    >
      <div className="flex flex-col">
        {icon}
        <span className="text-[10px] font-semibold capitalize">{title}</span>
      </div>
    </div>
  );
};

export default NavbarItem;

export const ScanNavbarItem = ({ icon, url, title }) => {
  const navigate = useNavigate();
  const { sound } = usePlaySound();
  const [playButtonSfx] = useSound(buttonSfx, { soundEnabled: sound });

  const handleClick = useCallback(() => {
    playButtonSfx();
    navigate(url);
  }, [navigate, url, playButtonSfx]);

  return (
    <div
      className="flex justify-center items-center w-1/5 h-12 hover:cursor-pointer rounded shadow-navbar-item"
      onClick={handleClick}
    >
      <div className="flex flex-col">
        <div className="-mt-11 flex justify-center items-center bg-[#6BCCC0] w-14 h-14 rounded-[28px] shadow-[0_8px_8px_#00000060]">
          {icon}
        </div>
        <span className="mt-1 text-[10px] font-semibold capitalize text-center">{title}</span>
      </div>
    </div>
  );
};
