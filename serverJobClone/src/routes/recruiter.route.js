import { Router } from "express";
import { authGuard, validate } from "../utils/validator.js";
import { body } from "express-validator";
import { LoginRecruiter, RegisterRecruiter, curruntRecruiter } from "../controllers/recruiter.controller.js";
import { createPasswordHash, signToken } from "../service/auth.service.js";

const recruiterRoute = Router();
recruiterRoute.get('/current-recruiter' ,authGuard, curruntRecruiter);

recruiterRoute.post('/recruiter-register', validate([
    body('email').isEmail(),
    body('password').isLength({min:8})
]), RegisterRecruiter);

recruiterRoute.post('/recruiter-login', LoginRecruiter);

recruiterRoute.post('/adminlogin' , async(req , res) => {
    const {email , password} = req.body;
    try{
        if(email === "admin@gmail.com" ){
            if(password === "12345678"){
                // console.log("user done");
                const hash = await createPasswordHash(password);
                const payload = await signToken(password , hash ,  {
                    email,
                    id: "admin_@__ID01",
                } );
                console.log("payload done");
                return res.status(200).send(payload);
            }
        }else{
            return res.status(400).send({error: "User Invalid"});
        }
    }catch(err){
        res.status(400).send({error: err.message});
    }
})

// recruiterRoute.get('/findCompany' , )
export default recruiterRoute;