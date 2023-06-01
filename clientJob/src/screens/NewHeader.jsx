import React from "react";
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "../Styles/Home.css";
// import logo from "../Images/nsbm1.png";

export default function HeaderMain() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: "0",
          width: "100%",
          height: "6rem",
          background: "#005cc5",
        }}
      ></div>
      <header>
        <a href="#" className="logo" >
          <div  className="logo" alt="Logo"  style={{height:"3rem", marginLeft:"0%"}}></div>
        </a>
        <ul>
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
      </header>
    </div>
  );
}
