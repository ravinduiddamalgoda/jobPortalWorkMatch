import jobService from "../service/job.service.js";
import Job from '../models/jobApp.js'
import nodemailer from 'nodemailer';





export  const addJob = async(req,res)=>{

    try{
        const {recuiterEmail,jobTitle,jobStatus,jobType,feild,position,skill,description } = req.body;

        
        const newJob = await jobService.registerJob(recuiterEmail,jobTitle,jobStatus,jobType,feild,position,skill,description);
        res.status(200).json(newJob);
    }catch(err){
        res.status(400).send({ err: err.message });
    }
   

} 

export const allJobs = async (req ,res) => {
    try{
        Job
        .find()
        .then(job => res.json(job))
        .catch(() => res.status(404).json({ err: 'Jobs Not found' }));

    }catch(err){
        res.status(400).send({ err: err });

    }

}

export const getJobByRecuiter = async (req,res) => {
    // const curntRecruiter  = req.user;
    // console.log(curntRecruiter.email);
    const email = req.params['email'];
    try{
        
        // const {recuiterEmail} = req.body;
        // console.log(curntRecruiter.email);
        // if(!curntRecruiter) {
        //     console.log(recuiterEmail);
        //     return res.status(400).send({ err: 'email not found' });
        // }
        const recuiterJob = await jobService.recuiterJob(email);
        res.status(200).json(recuiterJob);
    }catch(err){
        res.status(400).send({ err: err.message });
    }
}