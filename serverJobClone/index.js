import bodyParser from 'body-parser';
import express from 'express'; 
import mongoose from 'mongoose';
import userRouter from './src/routes/user.route.js';
import jobRouter from './src/routes/job.route.js';
import applicantRouter from './src/routes/applicant.route.js'
import recruiterRoute from './src/routes/recruiter.route.js';
import cors from 'cors';
import Stripe from "stripe";
import { resolve } from 'path';
import dotenv from "dotenv";
import rateRouter from './src/routes/rating.route.js';
import { fileURLToPath } from 'url';
import path from 'path';
const env = dotenv.config({ path: "./.env" });
import nodemailer from 'nodemailer';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//import userRouter from './src/controllers/user.control';
//import userRouter from './src/controllers/user.control';
//const userRouter = require('./src/controllers/user.control');
// require("dotenv").config();
const app =  express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(process.env.STATIC_DIR));
const url = 'mongodb+srv://user_dev:test123@jobclone.u4tnvcc.mongodb.net/?retryWrites=true&w=majority';
const port = 3000;
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'yapasanu19@gmail.com',
//     pass: 'jcbzgmumjdipskbz'
//   }
// });

// var fname = 'Ravindu';
// const mailTextData = `Dear ${fname},

//     We are delighted to inform you that your registration to RecruitNSBM, the premier online recruitment portal of NSBM, has been successfully completed! 
    
//     Congratulations and welcome aboard!
    
//     RecruitNSBM is your go-to platform for connecting talented job seekers and top-notch recruiters, offering limitless opportunities for professional growth and success. As a valued member of our esteemed community, you now have exclusive access to a wealth of features, resources, and a supportive network dedicated to helping you achieve your career goals.
    
//     Here are some key features and benefits you can enjoy as a registered member of RecruitNSBM:
    
//     Seamless Job Search: Explore an extensive collection of job listings, tailored to your preferences and expertise. Discover exciting career prospects from leading companies across various industries.
    
//     Enhanced Profile: Create a compelling profile that highlights your skills, experience, and qualifications. Stand out from the competition and attract the attention of recruiters actively seeking talented professionals like you.
    
//     Application Management: Effortlessly manage your job applications, track their status, and receive timely updates on the progress of your applications.
    
//     Personalized Recommendations: Our advanced algorithm matches you with relevant job opportunities based on your profile, skills, and career interests. Receive customized job recommendations that align with your aspirations.
    
//     Career Resources: Access a wealth of resources, including interview tips, resume building guidance, and career advice articles. Stay informed and empowered throughout your job search journey.
    
//     We are dedicated to providing you with a seamless and rewarding experience on our platform. If you have any questions or need assistance, our dedicated support team is always here to assist you.
    
//     Once again, congratulations on joining RecruitNSBM! Your path to professional success begins here. Start exploring, connecting, and unlocking a world of opportunities.
    
//     Best regards,
    
//     RecruitNSBM Team`


  
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });



async function connectDB(url , connectionParams){
    
       await mongoose.connect(url , connectionParams);
       
       // console.log("DB Connected");
}

// connectDB(url);
connectDB(url , {}).then(()=>{

    console.log("Database Connected");
    app.listen(port , ()=>{
        console.log("Listening on port 3000");
    });
}).catch((err)=>{
    console.error('Connection Error',err);
})
 

app.use(userRouter)
app.use(jobRouter)
app.use(applicantRouter)
app.use(recruiterRoute);
app.use(rateRouter);
app.get("/config", (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });


  app.post("/create-payment-intent", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "INR",
        amount: 50,
        automatic_payment_methods: { enabled: true },
      });
  
      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });
  
