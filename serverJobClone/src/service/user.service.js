import Rating from "../models/rating.js";
import User from "../models/user.js";
import { createPasswordHash, signToken } from "./auth.service.js";


async function findUserByEmail(email){

    const existingUser = await User.findOne({
        email
    })

    return existingUser;
}


 async function register(fname , lname , email , password , major ,skills , level ,qualification ){

    const hash = await createPasswordHash(password); // password hashing 
    const newUser = new User({
        fname,
        lname,
        email,
        password: hash, 
        major,
        skills,
        level,
        qualification
    });
    
    await newUser.save();
    const userCpy =  JSON.parse(JSON.stringify(newUser));
    const newRate = new Rating({
        email , 
        rating:0,
        major,
        fname,
        lname
    });
    await newRate.save();
    
    delete userCpy?.password
    return userCpy

}

async function login(email , password){

    const acc = await User.findOne({ email})

    if (!acc){
        throw new Error ('User Not Found');
    }

    const payload = await signToken(password, acc.password, {
        email: acc.email,
        id: acc._id.toString(),
    });

    return payload;

}

async function getUsers (){
    try{
        const userData = await User.find();
        return userData
    }catch(err){
        throw new Error ('Error');
    }

}


export default {
    findUserByEmail,
    register,
    login,
    getUsers
}