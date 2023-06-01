import { Box, makeStyles } from "@material-ui/core";
import { Container, Typography } from "@mui/material";
import { JobCard } from "../component/JobCard";
import { UserCard } from "../component/UserCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../component/AuthProvider";
import axios from "axios";
import { useSnackbar } from "notistack";
import HeaderMain from "./NewHeader";
import HeaderJob from "../component/JobHeader";
import { StudentCard } from "../component/SearchCardStudent";
import { StudentCardAdmin } from "../component/SearchCardAdmin";
import HeaderJobAdmin from "../component/HeaderJodAdmin";




export function AdminMain(){

    const [jobData , setJobData] = useState([]);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        try{
            const getJob = async () => {
                // var email = "kumar@gmail.com";
                const res = await axios.get('http://localhost:3000/getJobByRecuiter/admin@gmail.com');
                console.log(res.data);
                setJobData(res.data);
              }
          
              getJob();
              

        }catch(err){
            // enqueueSnackbar(err, { variant: 'error' });
            // console.log(err.response.data);

        }
        
      }, []);
    //   var skills = ["js" , "node" ," MERN Stack"];
    // var des = "This is greate job position who looking for a Intern in web developer title.";

    return(<>
      <HeaderJobAdmin />


      <Container sx={{display: 'flex' , flexDirection: 'row' , paddingTop: '1%' , width:'100%'}}>

        <Box >
        {/* <a href="/job/addjob">add job</a> */}

            {/* <JobCard jobTitle="Intern for Software Engineering" company="Axoten Innovation" jobStatus = "6 months" jobType = "Tempory" feild = "Software Engineering" position = "Intern" skill = {skills} description = {des}/> */}
            {/* <JobCard jobTitle="Intern for Software Engineering" company="Axoten Innovation" jobStatus = "6 months" jobType = "Tempory" feild = "Software Engineering" position = "Intern" skill = {skills} description = {des}/> */}
                
            {
                jobData.map(data => (
                    <JobCard jobTitle={data.jobTitle} company={data.company} jobStatus ={data.jobStatus} jobType = {data.jobType} feild = {data.feild} position = {data.position} skill = {data.skill} description = {data.description}/>
                ))
            }
        </Box>
        {/* <StudentCard/> */}
        
         <StudentCardAdmin />

    </Container>
    </>);

}