import  fs  from 'fs';
import { __dirname } from '../../index.js';
import Applicant from '../models/applicant.js'

import path from 'path';
import { PDFDocument } from 'pdf-lib';



export const addForJob = async(req,res) =>{

    
    try{

        const {applicantName ,applicantEmail , appliedJobID} = req.body;
        const newApplicant = new Applicant({
            applicantName ,
            applicantEmail,
            appliedJobID,
        })

        const existinApplicant = Applicant.findOne({applicantEmail});
        // const existing
        
        // if(existinApplicant){
        //     return res.status(400).send({err: "You have already applied."});
        // }
        if(req.file){

            newApplicant.cv = req.file.path
            console.log(newApplicant.cv)
        }


        
        await newApplicant.save();

        res.status(200).send(newApplicant);

    }catch(err){
        res.status(400).send({err:err})
    }
}

export const getCv = async (req , res) =>{
    const jobId = req.params['jobId'];
    // const options = {
    //     root: path.join(__dirname)
    // };
    
    try{
        const data = await Applicant.find({appliedJobID:jobId});
        // console.log(data);
        // const pdfData = data.map(applicant => {
        //     const pdfUrl = path.join(__dirname, applicant.cv);;
        //     return {
        //     //   email: applicant.applicantEmail,
        //       pdfUrl
        //     };
        //   });
        var val = [];
            // const filePaths = data.map(data => path.join(__dirname, data.cv));
            // fs.readFile(data[0].cv, (err, data) => {
            //     if (err) {
            //       console.error(err);
            //       return res.status(500).json({ error: 'Failed to retrieve CV' });
            //     }})
            //     res.setHeader('Content-Type', 'application/pdf');
            //     res.send(data);
            // console.log(data[0].cv);
            let index = 0;
            // filePaths.forEach(async filePath => {
            //     const dataVal =  await fs.promises.readFile(filePath);
            //     const file = await PDFDocument.load(dataVal);
            //     val.push(file)

            // });
            // res.setHeader('Content-Type', 'application/pdf');
            // res.status(200).send(val);

            ////// done code to PDF ///////
            // filePaths.forEach(filePath => {
            //     const stream = fs.createReadStream(filePath);
            //     stream.pipe(res);
            //     // index++;
                
            //   });

              ///////////////////////////



            // const pdfData =  path.join(__dirname, data[0].cv);
          res.status(200).send(data);
        //   res.download(pdfData);
    }catch(err){
        res.status(400).send({err:err.message});
    }

}


export const getCVData = async (req , res) =>{
    const id = req.params['applicantId'];

    try{
        const cvData = await Applicant.findById({_id: id});
        const filePath =  path.join(__dirname, cvData.cv);

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);

    }catch(err){
        res.status(400).send({err:err.message});
    }
}