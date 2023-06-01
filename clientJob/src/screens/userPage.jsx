import { Box, makeStyles } from "@material-ui/core";
import { Container, TextField, Typography, backdropClasses } from "@mui/material";
import { JobCard } from "../component/JobCard";
import { UserCard } from "../component/UserCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../component/AuthProvider";
import axios from "axios";
import { useSnackbar } from "notistack";
import HeaderMain from "./NewHeader";
//import HeaderMain from "./header";
// import { Headerm } from "./header";

const useStyles = makeStyles((theme) => ({
  boxStyle: {
    border: "1px solid",
    [theme.breakpoints.up("900")]: {
      width: "600px",
    },
    [theme.breakpoints.down("900")]: {
      width: "600px",
    },
    [theme.breakpoints.down("600")]: {
      width: "300px",
    },
    // background: '#4EB5FF',
    marginLeft: "15%",
    marginRight: "15%",
    borderRadius: "0px",
    marginTop: "3%",
  },

}));

export function MainPageUser() {
  const className = useStyles();
  const [userName, setUserName] = useState("");
  const [email , setEmail] = useState("");
  const [jobData , setJobData] = useState([]);
  const token = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(token);
  
  var resData;
  useEffect(() => {
    try {
      const currentUser = async () => {
        const res = await axios
          .get("http://localhost:3000/currunt-user", {
            headers: {
              Authorization: "Bearer " + token.token,
            },
          })
          .then((res) => {
            
            var name = res.data.fname + " " + res.data.lname;
            setUserName(name);
            setEmail(res.data.email);
            console.log(res.data);
           
          });
      };

      if (token) {
        resData = currentUser();
      }
    } catch (err) {
      enqueueSnackbar(err, { variant: "error" });
    }
  }, [token]);

  useEffect(() => {
    try {
      const jobData = async () => {
        const res = await axios
          .get("http://localhost:3000/getJob")
          .then((res) => {
            // var name = res.data.fname + " " + res.data.lname;
            // setUserName(name);
            setJobData(res.data);
            console.log(res.data);
          });
      };

      jobData();
      
    } catch (err) {
      // enqueueSnackbar(err, { variant: "error" });
      console.log(err)
    }
  }, []);
  // if(!userName || userName ==""){
  //   window.location.reload();
  // }
  // window.location.reload();
  console.log(userName);
  var skills = ["js", "node", " MERN Stack"];
  var des =
    "This is greate job position who looking for a Intern in web developer title.";
  return (
    <div>
      <HeaderMain/>
    <div style={{backgroundColor:"#017143", width:"100%"}} >
    
      <TextField type="text" 
        style={{ height:"3.5rem", 
        width:"30%",
        marginTop:"1rem",
        marginBottom:"1rem",
        marginLeft:"30%",
        marginRight:"20%",
        borderRadius:"1rem",
        backgroundColor:"white",color:"black", }} 
        placeholder=" Search job" onChange={(event) => {
              setSearchTerm(event.target.value);
            }} />
    </div>
    <Container sx={{display:'flex' , flexDirection:'row'}}>
    {/* <Headerm/> */}
    
    
      <Container sx={{ display: "flex", flexDirection: "row" ,marginTop:"1%" , marginLeft:'1%' }}>
        
        <UserCard name={userName} />

        <Container sx={{}}>
          {jobData.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            }).map(item=>(
              <JobCard
              applicantName = {userName}
              applicantEmail = {email}
              jobId = {item._id}
              jobTitle={item.jobTitle}
              company={item.company}
              jobStatus={item.jobStatus}
              jobType={item.jobType}
              feild={item.feild}
              position={item.position}
              skill={item.skill}
              description={item.description}
              typeStat= {true}
           />

          ))}
          {/* <JobCard
            jobTitle="Intern for Software Engineering"
            company="Axoten Innovation"
            jobStatus="6 months"
            jobType="Tempory"
            feild="Software Engineering"
            position="Intern"
            skill={skills}
            description={des}
          />
          <JobCard
              jobTitle={item.jobTitle}
              company={item.company}
              jobStatus={item.jobStatus}
              jobType={item.jobType}
              feild={item.feild}
              position={item.position}
              skill={item.skill}
              description={item.description}
           />
          <JobCard
            jobTitle="Intern for Software Engineering"
            company="Axoten Innovation"
            jobStatus="6 months"
            jobType="Tempory"
            feild="Software Engineering"
            position="Intern"
            skill={skills}
            description={des}
          />

          <JobCard
            jobTitle="Intern for Software Engineering"
            company="Axoten Innovation"
            jobStatus="6 months"
            jobType="Tempory"
            feild="Software Engineering"
            position="Intern"
            skill={skills}
            description={des}
          /> */}
        </Container>
      </Container>
    </Container>
    </div>
  );
}

// function JobCard(props){
//     const className = useStyles();
//     return(<>
//         <Box className={className.boxStyle}>
//             <Container sx={{ display: 'flex'}}>
//                 <Typography variant="h5" display="inline" className={className.title1}>{props.jobTitle}</Typography>
//                 <Typography variant="h5" display="inline" className={className.title2}>{props.company}</Typography>
//             </Container>

//         </Box>
//     </>);

// }
