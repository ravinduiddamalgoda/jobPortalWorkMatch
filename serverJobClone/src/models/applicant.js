import mongoose, { Schema} from "mongoose";

const applicantSchema = new Schema({

    applicantName : {
        required:true,
        type:String
    },
    applicantEmail:{
        required:true,
        type:String
    },
    cv:{
        required:true,
        type:String
    },
    appliedJobID:{
        required:true,
        type:String
    }
},{timestamps:true})

const Applicant = mongoose.model('Applicant', applicantSchema);
export default  Applicant;