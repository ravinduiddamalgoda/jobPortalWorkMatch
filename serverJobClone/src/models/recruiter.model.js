import mongoose, { Schema } from "mongoose";


const recruiterSchema = new Schema({
    companyName: String,
    recruiterName: String,
    email:{
        required: true,
        type: String,
    },
    password:{
        required: true,
        type: String,
    },
    companyMajor: String,
});

const Recruiter = mongoose.model('Recruiter' , recruiterSchema);

export default Recruiter;

