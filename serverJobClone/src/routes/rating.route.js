import { Router } from "express";
import { AddRate, getRate } from "../controllers/rating.controller.js";
import { authGuard, validate } from "../utils/validator.js";

const rateRouter = Router();


rateRouter.put('/updaterate/:email' , authGuard , AddRate);

rateRouter.get('/getallrating' , getRate );

// rateRouter.get()

export default rateRouter;