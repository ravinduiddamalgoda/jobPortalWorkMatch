import { Box, makeStyles } from "@material-ui/core";
import { Container, Typography } from "@mui/material";
import { JobCard } from "../component/JobCard";
import { UserCard } from "../component/UserCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../component/AuthProvider";
import axios from "axios";
import { useSnackbar } from "notistack";
import HeaderMain from "./NewHeader";
import HeaderJob from "../component/JobHeader";
import { StudentCard } from "../component/SearchCardStudent";




export function JobReMain(){

    const [jobData , setJobData] = useState([]);
    const {enqueueSnackbar} = useSnackbar();
    const token = useContext(AuthContext);
    console.log(token);

    const [email , setEmail] = useState("");
    // const stateRun = useCallback(()=> {
    //     const getJob = async () => {
    //         try{
    //             var emailData = email;
    //             const res = await axios.get('http://localhost:3000/getJobByRecuiter/' + emailData);
    //             console.log(res.data);
    //             setJobData(res.data);
    //             // enqueueSnackbar("Job Data Grab", { variant: "info" });
    //         }catch(err){
    //             enqueueSnackbar(err.message, { variant: "error" });
    //         }
               
    //      }
          
    //           getJob();
              


    //    } , [email]);
        
    useEffect(() => {

        const currentUser = async () => {
            try {
              const response = await fetch("http://localhost:3000/current-recruiter", {
                headers: {
                  Authorization: "Bearer " + token.token,
                },
              });
      
              if (response.ok) {
                const data = await response.json();
                setEmail(data.email);
                console.log(data.email);
                enqueueSnackbar("Job Data Grab", { variant: "info" });
                // return data;
                // enqueueSnackbar("Data Got Success", { variant: "success" });
                
              } else {
                throw new Error("Request failed with status: " + response.status);
              }
            } catch (error) {
              // Handle error
              console.error(error);
              // enqueueSnackbar(error.message, { variant: "error" });
            }
          };
          var recruiterData;
          

           currentUser();
    
       
        
          const getJob = async () => {
            try{
                const fromStorage = await localStorage.getItem('Remail');
                var emailData = fromStorage;
                const res = await axios.get('http://localhost:3000/getJobByRecuiter/' + emailData);
                console.log(res.data);
                setJobData(res.data);
                // enqueueSnackbar("Job Data Grab", { variant: "info" });
            }catch(err){
                enqueueSnackbar(err.message, { variant: "error" });
            }
               
         }
          
              getJob();
              
        
        
      }, []);
    //   var skills = ["js" , "node" ," MERN Stack"];
    // var des = "This is greate job position who looking for a Intern in web developer title.";

    return(<>
      <HeaderJob />


    <Container sx={{display: 'flex' , flexDirection: 'row' , paddingTop: '1%' , width:'100%'}}>

        <Box >
        {/* <a href="/job/addjob">add job</a> */}

            {/* <JobCard jobTitle="Intern for Software Engineering" company="Axoten Innovation" jobStatus = "6 months" jobType = "Tempory" feild = "Software Engineering" position = "Intern" skill = {skills} description = {des}/> */}
            {/* <JobCard jobTitle="Intern for Software Engineering" company="Axoten Innovation" jobStatus = "6 months" jobType = "Tempory" feild = "Software Engineering" position = "Intern" skill = {skills} description = {des}/> */}
                
            {
                jobData.map(data => (
                    <JobCard jobId = {data._id} jobTitle={data.jobTitle} company={data.company} jobStatus ={data.jobStatus} jobType = {data.jobType} feild = {data.feild} position = {data.position} skill = {data.skill} description = {data.description}/>
                ))
            }
        </Box>
        <StudentCard/>
            

    </Container>
    </>);

}