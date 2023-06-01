import UserService from "../service/user.service.js";
import Rating from "../models/rating.js";
import User from "../models/user.js";
// import nodemailer 
import nodemailer from 'nodemailer';



export const CurrentUser = async (req ,res) => {
    const curntUser  = req.user;
    //console.log(currntUser);

    try{
        
        if(!curntUser){
            return res.status(400).send({ err: 'User Not Logged In'});
        }

        const userDoc = await UserService.findUserByEmail(curntUser.email);
        const user = userDoc?.toJSON();
    
        delete user?.password; //detele user paaword befor e send it to the frontend
        res.status(200).json(user);

    }catch(err){
        res.status(400).send({ err: err });

    }

}


export const UpdateUser = async( req , res) => {
  const id = req.params['userID'];

  try {
    const {fname, lname, major , skills , level , qualification} = req.body;
    const updatedData = await User.findByIdAndUpdate( id , {fname, lname, major , skills , level , qualification});
    res.json(updatedData);

  }catch(err){

    res.status(400).send({ err: err.message });
  }

}

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'recruitnsbm@gmail.com',
    pass: 'sllkozacqwzyfxwb'
  }
});

export const RegisterUser = async (req, res) => {
  try {
    const { fname, lname, email, password , major , skills , level , qualification } = req.body;

    const mailTextData = `Dear ${fname},

    We are delighted to inform you that your registration to RecruitNSBM, the premier online recruitment portal of NSBM, has been successfully completed! 
    
    Congratulations and welcome aboard!
    
    RecruitNSBM is your go-to platform for connecting talented job seekers and top-notch recruiters, offering limitless opportunities for professional growth and success. As a valued member of our esteemed community, you now have exclusive access to a wealth of features, resources, and a supportive network dedicated to helping you achieve your career goals.
    
    Here are some key features and benefits you can enjoy as a registered member of RecruitNSBM:
    
    Seamless Job Search: Explore an extensive collection of job listings, tailored to your preferences and expertise. Discover exciting career prospects from leading companies across various industries.
    
    Enhanced Profile: Create a compelling profile that highlights your skills, experience, and qualifications. Stand out from the competition and attract the attention of recruiters actively seeking talented professionals like you.
    
    Application Management: Effortlessly manage your job applications, track their status, and receive timely updates on the progress of your applications.
    
    Personalized Recommendations: Our advanced algorithm matches you with relevant job opportunities based on your profile, skills, and career interests. Receive customized job recommendations that align with your aspirations.
    
    Career Resources: Access a wealth of resources, including interview tips, resume building guidance, and career advice articles. Stay informed and empowered throughout your job search journey.
    
    We are dedicated to providing you with a seamless and rewarding experience on our platform. If you have any questions or need assistance, our dedicated support team is always here to assist you.
    
    Once again, congratulations on joining RecruitNSBM! Your path to professional success begins here. Start exploring, connecting, and unlocking a world of opportunities.
    
    Best regards,
    
    RecruitNSBM Team`;



    var mailOptions = {
      from: 'recruitnsbm@gmail.com',
      to: email,
      subject: ' Welcome to RecruitNSBM - Your Gateway to Success!',
      text: mailTextData
    };
    

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    const existingUser = await UserService.findUserByEmail(email);
    const existingRating = await Rating.findOne({email});

    if(existingRating){
        return res.status(400).send({err: "user already rated"});
    }
    if (existingUser) {
      return res.status(400).send({
        err: "User already Exits",
      });
    }

    const user = await UserService.register(fname, lname, email, password , major , skills , level , qualification );
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const LoggedUser =  await UserService.login(email , password);

    res.status(200).send(LoggedUser);

  } catch (err) {
        res.status(400).send({ err: err.message})

  }
};


export const getAllUsers = async (req , res) => {

    try{
       const data = await UserService.getUsers(); 
       res.status(200).send(data);
    }catch(err){
      res.status(400).send({ err: err.message});
    }

}



export const getUserByEmail = async (req , res) =>{
  const email = req.params['email'];
  try{
    const data =  await UserService.findUserByEmail(email);
    const userCpy =  JSON.parse(JSON.stringify(data));
    delete userCpy?.password
    res.status(200).send(userCpy);
  }catch (err){
    res.status(400),send({err: err.message});
  }
 



}