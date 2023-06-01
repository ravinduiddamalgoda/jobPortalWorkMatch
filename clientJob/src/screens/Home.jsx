import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import logo from "../Images/nsbm.png"
import job from "../Images/job.png"
import LogoNew from '../assets/loginLogo.png'
import search from"../Images/search.png"
import pay from '../Images/pay.png'
 import final from '../Images/final.jpeg'
import { FaFacebook,FaYoutube,FaLinkedin,FaInstagram,FaRegBuilding,FaSearch,FaTrophy,FaGrin,FaDollarSign,FaGraduationCap} from 'react-icons/fa';
export function HomePage(){


    localStorage.clear();
    return(

        <div>
        <section>
        <div class="circle">

        </div>
        <header>
            <a href="#" class="logo"><img src={LogoNew} class="logo" width="100px" /></a>
            <ul>
                
                <li><a href="/home">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/login">CV Templates</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/login">Login</a></li>

            </ul>
        </header>

        <div class="content">
            <div class="textbox">
                <h1>Work Match<br /><span></span></h1><br />
                <p>
                An online job portal, also known as a job board or employment website, is a digital platform that connects job seekers with employers looking to fill job vacancies. It serves as a virtual marketplace where individuals can find employment opportunities and apply for jobs, while employers can post job listings and search for suitable candidates.
                </p>
            </div>
            <div class="imgbox">
                <img src={job} />
            </div>
        </div>
    </section>

    <div class="container">
        <h1>JOB SEEKERS CAN ..</h1><br />
        <div class="box">
            <div class="icon"><ion-icon name="business-outline"><FaRegBuilding/></ion-icon></div>
            <div class="txt">
                <h3>JOB RENDERS</h3><br />
                <p>Job vacancies in NSBM & other companies in different job fields are offered.</p>
            </div>
        </div>
        <div class="box">
            <div class="icon"><ion-icon name="search-outline"><FaSearch/></ion-icon></div>
            <div class="txt">
                <h3>SEARCH</h3><br />
                <p>Search the vacancies according to the specialized field & qualifications.</p>
            </div>
        </div>
        <div class="box">
            <div class="icon"><ion-icon name="trophy"><FaTrophy/></ion-icon></div>
            <div class="txt">
                <h3>SUCCESS</h3><br />
                <p>Achieve success in the carrier journey of life.</p>
            </div>
        </div>
        <div class="box">
            <div class="icon"><ion-icon name="happy"><FaGrin/></ion-icon></div>
            <div class="txt">
                <h3>STRESS FREE</h3><br />
                <p>Lead a stress free happy life with great earning & professional working.</p>
            </div>
        </div>
        <div class="box">
            <div class="icon"><ion-icon name="school"><FaGraduationCap/></ion-icon></div>
            <div class="txt">
                <h3>GRADUATES</h3><br />
                <p>All the undergraduates & graduates of NSBM have the opportunity to search vacancies for suitable positions.</p>
            </div>
        </div>
        <div class="box">
            <div class="icon"><ion-icon name="logo-usd"><FaDollarSign/></ion-icon></div>
            <div class="txt">
                <h3>EARN</h3><br />
                <p>Earn reasonable wage for the work you render to the organization.</p>
            </div>
        </div>

    </div>
    <br /><br />

    <div class="row">
        <div class="col">
            <div class="gallery">

                <img src={final} />

            </div>

        </div>
        <div class="col">
            <div class="word">
                <h1> We Help To Get The <span>Best Job </span>And Find A Talent. </h1>
                <p>We assist our undergraduate and postgraduates to get the best job to their talent.</p>
                <ul>
                    
                </ul>
            </div>
        </div>
    </div>
    <br /><br /><br />

    <div class="work">
        <h1>How It <span>Works? </span></h1>
    </div>

  
    <br />
        <div class="card1">
            <img src={search} />
            <div class="cardword">
                <h2>Identify</h2><br />
                <p>Find the best specialists<br />
                that can provide vacancies.</p>
            </div>
        </div>

        <div class="card1">
            <img src={pay} />
            <div class="cardword">
                <h2>Pay</h2><br />
                <p>We provide quotes and immediately pair each<br /> applicant with the most qualified employers.</p>
            </div>
        </div>

        <div class="card1">
             <img src={search}/>
            <div class="cardword">
                <h2>Work</h2><br />
                <p>Pay promptly for service that leaves<br /> you completely delighted.</p>
            </div>
        </div>
    <br /><br />



    <br /><br /><br />
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


    );



}
// export default Home;