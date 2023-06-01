import React, { useEffect, useState } from "react";
import "../Styles/Home.css"
import logo from "../Images/nsbm.png"
import { FaFacebook,FaYoutube,FaLinkedin,FaInstagram} from 'react-icons/fa';
import { Link } from "react-router-dom";


function footer(){
return(
    <footer class="footer">
        <div class="footer-l">
        <img src={logo} />

            <p class="footer-links">
            <Link to="/">Home</Link>
           
               
                <a href="#">About</a>
                <a href="#">CV Templates</a>
                <Link to="/contact">Contact Us</Link>
                
            </p>
            <p class="nsbm">NSBM Green University Town</p>

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
                <p><a href="mailto:inquiries@nsbm.ac.lk" target="_blank">inquiries@nsbm.ac.lk</a></p>
            </div>

        </div>

        <div class="footer-r">
            <p class="about">
                <span>Our University</span>
                NSBM prides itself on being a <br />forward-thinking entitiy,with the <br />constant drive to push boundaries
            </p>
            <div class="footericons">
                <a href="https://www.facebook.com/nsbm.lk" target="_blank"><ion-icon name="logo-facebook"><FaFacebook/></ion-icon></a>
                <a href="https://www.youtube.com/channel/UCHsodhRyiuri2jD7H7nfsRg/feed" target="_blank"><ion-icon name="logo-youtube"><FaYoutube/></ion-icon></a>
                <a href="https://lk.linkedin.com/school/nsbmgreenuniversity/" target="_blank"><ion-icon name="logo-linkedin"><FaLinkedin/></ion-icon></a>
                <a href="https://www.instagram.com/nsbmgreenuniversity/" target="_blank"><ion-icon name="logo-instagram"><FaInstagram/></ion-icon></a>
            </div>
        </div>

    </footer>



)}

export default footer