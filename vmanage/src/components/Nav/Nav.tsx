import React, { useContext } from "react";
import "./style.css";
import { UserContext } from "../../context/UserContext";

const Nav = () => {
   const usercontext = useContext(UserContext);
    return (
      <div className="nav-wrapper">
        <div className="nav-logo">
          <h1>vManage</h1>
          <span>{usercontext?.user?.userEmail}</span>
        </div>
      </div>
    );
};

export default Nav;
