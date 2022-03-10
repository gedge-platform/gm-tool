import React from "react";
import logo from "./images/logo-dark.png";
import { Link } from "react-router-dom";
import "./css/Login.css";

const BrandArea = () => {
  return (
    <div className="brandArea">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="HyperLedger" />
        </Link>
      </div>
      <div className="copyright">
        Copyright (C) 2022 innogrid. All rights reserved.
      </div>
    </div>
  );
};

export default BrandArea;
