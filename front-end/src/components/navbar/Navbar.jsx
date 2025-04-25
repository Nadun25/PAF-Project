import React, { useContext, useState, useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Logo from "./../../assets/logo2.png";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = ({ userName, profilePic }) => {
  return (
    <div className="navbar">
      <div className="left">
        <img src={Logo} width={"50px"} alt="FitHub Logo"></img>
        <Link to={`/home/${userName}`} style={{ textDecoration: "none" }}>
          <span style={{ color: "white" }}>FitHub</span>
        </Link>
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
      </div>
      <div className="right">
        <div className="user">
          {profilePic && (
            <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
          )}
          <span style={{ color: "white" }}>{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
