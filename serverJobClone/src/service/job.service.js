import Job from '../models/jobApp.js'
import RecruiterService from './recruiter.service.js'
import nodemailer from 'nodemailer';
import userService from './user.service.js';


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'recruitnsbm@gmail.com',
      pass: 'sllkozacqwzyfxwb'
    }
  });

async function registerJob(recuiterEmail,jobTitle,jobStatus,jobType,feild,position,skill, description){
    const company = await RecruiterService.findRecruiterCompany(recuiterEmail);
    const RecruiterName = await RecruiterService.findRecruiterByEmail(recuiterEmail);
    const userData = await userService.getUsers();

   
    // console.log(companyName);
    const newJob = new Job({
        recuiterEmail,
        jobTitle,
        jobStatus,
        jobType,
        feild,
        position,
        skill,
        company,
        description
    });
    
    await newJob.save();
    const job =  JSON.parse(JSON.stringify(newJob));
    userData.map((item) => {
        const mailTextData = `

        Dear ${item.fname},
        
        We are thrilled to inform you about a new job opening that matches your specialized major. At ${company}, we strive to connect talented individuals like you with exciting career opportunities in your field.
        We are pleased to announce that a position for ${jobTitle} in ${feild} has been posted on our platform. This role presents a unique opportunity for you to apply your skills and knowledge in a dynamic and rewarding work environment.
        To view the complete job description and apply for this position, please visit our website. Take this opportunity to showcase your qualifications and demonstrate why you are the ideal candidate for this role.
        We highly encourage you to apply as soon as possible, as positions may fill up quickly. Don't miss out on this exciting chance to take the next step in your career!
        We wish you the best of luck with your application and look forward to seeing your potential shine!
        
        Best regards,
        ${RecruiterName.recruiterName} ,
        ${company}`;


            var mailOptions = {
                from: 'recruitnsbm@gmail.com',
                to: item.email,
                subject: `Subject: Exciting Job Opportunity: ${jobTitle} in ${feild}`,
                text: mailTextData
            };

            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
    });
  
    return job

}

async function recuiterJob(email){
    console.log(email)
    const recuiterJob = await Job.find({recuiterEmail:email})
    console.log(email)
    return recuiterJob
}


export default {
    registerJob,
    recuiterJob
}