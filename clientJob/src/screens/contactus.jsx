import React, { useEffect, useState } from "react";
import "../Styles/contactus.css"
import Footer from "./footer"
import Header from"./header"
import tell from '../Images/telephone.png'
import email from'../Images/email.png'
import fax from '../Images/fax.png'
 import call from '../Images/call.png'
import { Link } from 'react-router-dom';
import LogoNew from '../assets/loginLogo.png'
import { FaFacebook,FaYoutube,FaLinkedin,FaInstagram} from 'react-icons/fa';


export  function  Contactus(){



    return(

        <div>
              <section>
     
<Header/>
        <div class="content">

            <div class="iconcontact">
                <img src={tell} /><br />
                <img src={email} /><br />
                <img src={fax} /><br />
                <img src={call}/><br />
            </div>
            <div class="txt">
                <br /><br /><br />
                <h1>Phone</h1> <h2>+94 115445000 </h2> <br />
                <h1>Email</h1><h2> inquiries@workmatch.com</h2> <br />
                <h1>Fax</h1> <h2>+94 115445009</h2> <br />
                <h1>Hotline</h1> <h2>+94 712445000 </h2> <br />
            </div>

        </div>
        <div class="form">
            <br /><br /> <br /><h1>Name</h1><br />  <input type="text" class="filed" placeholder="Enter Name" /><br /><br />
            <h1>Contact Number</h1><br />  <input type="text" class="filed" placeholder="Enter Number" /><br /><br />
            <h1>Email</h1><br />  <input type="text" class="filed" placeholder="Enter Email" /><br /><br />
            <h1>Message</h1><br />  <textarea class="filed" placeholder="Type Message"></textarea><br /><br />
            <button class="btn"><h2>SEND</h2> </button>
        </div>

    </section>


    <br /><br />
    <div class="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7915.096195564071!2d80.62999317421047!3d7.292143478947297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20map%20location%20url%20kandy!5e0!3m2!1sen!2slk!4v1685624297342!5m2!1sen!2slk" width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7915.096195564071!2d80.62999317421047!3d7.292143478947297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20map%20location%20url%20kandy!5e0!3m2!1sen!2slk!4v1685624297342!5m2!1sen!2slk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
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
                <p><a href="mailto:inquiries@workmatch.com" target="_blank">inquiries@workmatch.com</a></p>
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
