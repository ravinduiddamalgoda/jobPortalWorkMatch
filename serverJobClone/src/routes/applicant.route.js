import { Router} from "express";
import {addForJob, getCVData, getCv}  from '../controllers/applicant.controller.js'
import upload from '../utils/upload.js'

const applicantRouter = Router()


applicantRouter.post('/apply',upload.single('cv'),addForJob)
// applicantRouter.post('/getcvByjobId/:jobId' , getCv);
applicantRouter.get('/getcvByjobId/:jobId', getCv);

applicantRouter.get('/getcvbyID/:applicantId' , getCVData);

export default applicantRouter;