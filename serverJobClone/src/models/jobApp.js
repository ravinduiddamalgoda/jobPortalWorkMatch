import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({ 
    jobTitle: {
        required: true, // title 
        type: String,
    },
    jobStatus:{
        required: true, // time period 
        type: String,
    },
    jobType:{
        required: true, // permenat - tempory
        type: String,
    },
    feild:{
        required: true, // IT BM etc
        type: String,
    },
    skill:{
        required: true, /// array skills 
        type: [String],
    },
    recuiterEmail:{ 
        required: true,
        type: String,
    },
    position:{  // intern senior 
        required: true,
        type: String,
    },
    company:String,
    description: String,
})

const Job =  mongoose.model('Job' , jobSchema);
export default Job;