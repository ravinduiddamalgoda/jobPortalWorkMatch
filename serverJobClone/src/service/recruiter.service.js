import Recruiter from "../models/recruiter.model.js";
import { createPasswordHash, signToken } from "./auth.service.js";

async function register(companyName , recruiterName , email , password , companyMajor ){

    const hash = await createPasswordHash(password);
    const newUser = new Recruiter({
        companyName,
        recruiterName,
        email,
        password: hash, 
        companyMajor,
    });
    
    await newUser.save();
    const userCpy =  JSON.parse(JSON.stringify(newUser));

    delete userCpy?.password
    return userCpy

}

async function findRecruiterByEmail(email){
    const existingUser = await Recruiter.findOne({
        email
    })

    return existingUser;

}


async function findRecruiterCompany(email){
    const existingUser = await Recruiter.findOne({
        email
    })
    console.log(existingUser.companyName);
    return existingUser.companyName;
}

async function findByCompany(company) {
    const existingUser = await Recruiter.findOne({companyName: company});

    // console.log(existingUser);
    return existingUser;
}

async function loginRecruiter(email ,password){
    const acc = await Recruiter.findOne({ email})

    if (!acc){
        throw new Error ('User Not Found');
    }

    const payload = await signToken(password, acc.password, {
        email: acc.email,
        id: acc._id.toString(),
    });

    return payload;
}


export default {
    register,
    findRecruiterByEmail,
    loginRecruiter,
    findRecruiterCompany,
    findByCompany
}