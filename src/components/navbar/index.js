import React from "react";
import NavbarItem, { ScanNavbarItem } from "./NavbarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCamera,
  faComment,
  faHome,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const user = useAuth();
  return (
    user &&
    user.isAuthenticated && (
      <div className="w-full fixed bottom-4 px-4 h-16 z-30">
        <div className="w-full flex bg-white rounded-[20px] gap-2 px-6 py-2 shadow-[0_4px_4px_#00000020]">
          <NavbarItem
            icon={<FontAwesomeIcon icon={faHome} />}
            url={"/"}
            title={"home"}
          />
          <NavbarItem
            icon={<FontAwesomeIcon icon={faBook} />}
            url={"/activity"}
            title={"activity"}
          />
          <ScanNavbarItem
            icon={<FontAwesomeIcon icon={faCamera} size="xl" />}
            url={"/face-upload"}
            title={"Scan"}
          />
          <NavbarItem
            icon={<FontAwesomeIcon icon={faComment} />}
            url={"/support"}
            title={"support"}
          />
          <NavbarItem
            icon={<FontAwesomeIcon icon={faList} />}
            url={"/menu"}
            title={"menu"}
          />
        </div>
      </div>
    )
  );
};

export default Navbar;
