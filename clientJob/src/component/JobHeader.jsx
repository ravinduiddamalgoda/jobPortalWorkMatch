import React from "react";
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import logo from "../Images/nsbm.png";
import LogoNew from '../assets/loginLogo.png'
export default function HeaderJob() {
  return (
    <div style={{
      // marginBottom: '2%'
      paddingBottom: '5%'
    }}>
      <div
        style={{
          position: "absolute",
          left: "0",
          width: "100%",
          height: "5rem",
          background: "#005CC5",
        }}
      ></div>
      <header>
        <a href="#" className="logo" >
          <img src={LogoNew} className="logo" alt="Logo"  style={{height:"3rem", marginLeft:"0%"}}/>
        </a>
        <ul>
          <li>
          <a href="/job">Home</a>
            <a href="/job/addjob">Add Job</a>
            <a href="/">Logout</a>
          </li>
        </ul>
      </header>
    </div>
  );
}
