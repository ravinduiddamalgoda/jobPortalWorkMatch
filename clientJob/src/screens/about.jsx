import React, { useEffect, useState } from "react";
import "../Styles/Home.css"
import Footer from "./footer"
import Header from"./header"
import look from '../Images/look.png'
import { FaFacebook,FaYoutube,FaLinkedin,FaInstagram} from 'react-icons/fa';
import { Link } from "react-router-dom";
import LogoNew from '../assets/loginLogo.png'
export function About(){
    return(

        <div>
            <Header/>
            <h1 
            style={
                {
                    fontSize: "50px",
            fontWeight: "bold",
            marginTop: "8%",
            marginLeft: '4%', 
            marginBottom: '1%',
            color: "#017143",
            fontFamily: "Bahnschrift"
                }
            }
            >About Us</h1>

            <div class="img">
        {/* <img src={look} style={{width:"95%" , marginLeft: '2%' , marginRight: '2%'}} /> */}
    </div>
    <br /><br /><br />
    <div class="txt" >
        <h2 style={{margin:'5%'}}>
        Work Match is a comprehensive platform designed exclusively for university students, providing a streamlined approach to finding internships and job opportunities. With a user-friendly interface, students can easily create profiles and input their skills, qualifications, and preferences. Our advanced matching algorithm analyzes this information to deliver personalized suggestions tailored to their unique career goals. We have established partnerships with a diverse range of companies, ensuring a wide selection of opportunities across various industries. 
Work Match is committed to empowering students by equipping them with the tools and resources needed to kickstart their professional journeys. Join Work Match today and unlock a world of possibilities, gaining valuable experience and accelerating your career growth. Let us help you navigate the path to success and make your mark in the professional world.
        </h2>
    </div>
    <footer class="footer">
        <div class="footer-l">
            <img src={LogoNew} width="75px" />

            <p class="footer-links">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">CV Templates</a>
                <a href="#">Contact Us</a>
                
            </p>
            <p class="nsbm">Work Match Job Portal</p>

        </div>
        <div class="footer-c">
            <div>
                <ion-icon name="location-sharp"></ion-icon>
                <p>
                    Mahenwaththa,<br />
                    Pitipana, Homagama,<br />
                    Sri Lanka.
                </p>
            </div>

            <div>
                <ion-icon name="call"></ion-icon>
                <p>
                    +94 11 544 5000 <br /> +94 71 244 5000
                </p>
            </div>


            <div>
                <ion-icon name="mail"></ion-icon>
                <p><a href="mailto:inquiries@nsbm.ac.lk" target="_blank">inquiries@workmatch.com</a></p>
            </div>

        </div>

        <div class="footer-r">
            <p class="about">
                <span>Our Company</span>
                Work Match prides itself on being a <br />forward-thinking entitiy,with the <br />constant drive to push boundaries
            </p>
            <div class="footericons">
                <a href="https://www.facebook.com/nsbm.lk" target="_blank"><ion-icon name="logo-facebook"><FaFacebook/></ion-icon></a>
                <a href="https://www.youtube.com/channel/UCHsodhRyiuri2jD7H7nfsRg/feed" target="_blank"><ion-icon name="logo-youtube"><FaYoutube/></ion-icon></a>
                <a href="https://lk.linkedin.com/school/nsbmgreenuniversity/" target="_blank"><ion-icon name="logo-linkedin"><FaLinkedin/></ion-icon></a>
                <a href="https://www.instagram.com/nsbmgreenuniversity/" target="_blank"><ion-icon name="logo-instagram"><FaInstagram/></ion-icon></a>
            </div>
        </div>

    </footer>



        </div>
    )
    
}
