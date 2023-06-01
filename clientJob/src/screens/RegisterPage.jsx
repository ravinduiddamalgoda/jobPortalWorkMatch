import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useSnackbar } from "notistack";
import axios from "axios";
import backImg from '../assets/images/22.jpg';
import jobImg from '../assets/job.png'
import Logo from '../assets/loginLogo.png'
import { useNavigate } from "react-router-dom";
import {
  FormHelperText,
  backdropClasses,
  Box,
  Button,
  FormControl,
  Input,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import imgUser from '../assets/images/userIcon.png';
// const useStyle =  makeS
const useStyles = makeStyles((theme) => ({
  formCtrl: {
   
    margin:'10px',
    
    
  },
  formCtrl1: {
   
   display:'auto', 
   background:'white',   
     
   },
  root: {
    // background: "white",
    ///////////////////
    // height: "100vh",
    // margin: "0 auto",
    // display: "flex",
    // padding: "2%",
    // opacity: '1',
    ////////////////////
    background: "white",
    // height: "100vh",
    // margin: "0 auto",
    marginTop: '2%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%',
    paddingBottom: '2%',
    height: 'auto',
    display: 'flex',
    // flexDirection: 'column',
    paddingTop:'2%',
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    // backgroundImage: `url(${backImg})`,
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    // width: '100vw',
    // height: '90vh',
    // paddingTop: "10%",
    // marginTop: "5%",
    flexDirection: "column",
    // borderRadius:'10px',

    [theme.breakpoints.up("md")]: {
      width: "40%",
    },
    [theme.breakpoints.down("md")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },

  },

  // backGroundImg: {
  //   backgroundImage: `url(${backImg})`,
  //   // backgroundPosition: 'inherit',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  //   width: '100vw',
  //   // height: '100vh',
  //   opacity: '0.9'
  // },
  iconImg: {
      
    width:'75px',
    height:'75px',
    paddingLeft: '35%',
    paddingTop: '2%' ,
    paddingBottom: '3%',
    paddingRight: '30px'
  },
  registrationName:{
    paddingLeft: '20%',
    fontWeight: 700
  },
  subTopic:{
    paddingLeft: '5%',
    marginTop: '2%' ,
    marginBottom: '1%' , 
    
  }
  
}));

export function RegisterUser(){

  const className = useStyles();
  const [state , setState] = useState(true);
  const [state2 , setState2] = useState(true);
  const [state3 , setState3] = useState(true);
  // const className = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();


  const makeRegistration = async (formData) => {


    console.log(formData);
    try {
      const res = await axios.post('http://localhost:3000/register', {
        ...formData,
      });
      // console.log(res);
      enqueueSnackbar('Succesfully Registered', { variant: 'success' });
      navigate('/login');
    } catch (err) {
      // console.log(res);
      const error = err.message;
       enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const SignupSchema = Yup.object().shape({
    fname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8 , 'Password must have atleast 8 characters'),
    major: Yup.string().required()
    
  });

  return(

    <div className={className.backGroundImg}>
      
     {/* <img src={backImg} className={className.backGroundImg}/> */}
      <Box className={className.root}>
        <Formik
          initialValues={{
            fname: "",
            lname: "",
            email: "",
            password: "",
            major:"",
            skills: "" ,
            level: "",
            qualification: ""
          }}
          
          validationSchema={SignupSchema}

          onSubmit = {makeRegistration}
        >
          {({values, handleChange, handleSubmit, errors}) => {
            return (
              <>
                {/* <img src = {imgUser} className = {className.iconImg}/> */}
                <div style={{ textAlign: 'left' }}>
                  <img src={Logo} style={{ width: '70px', height: '70px' , marginLeft:"2rem"}} />
                </div>
                <Typography variant="h3" className={className.registrationName}>Registration</Typography>
                {state == true ? (
                <>
                  <Typography variant="h6" className={className.subTopic}>User Details</Typography>
                  <FormControl className={className.formCtrl} variant="outlined">
                  <TextField
                    
                    className={className.formCtrl1} 
                    value={values.fname}
                    onChange={handleChange}
                    name="fname"
                    label="First Name"
                    placeholder="first name"
                    error={errors.fname && errors.fname?.length ? true : false}
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.fname}
                </FormHelperText>
                <FormControl className={className.formCtrl}>
                  <TextField
                    className={className.formCtrl1}
                    error={errors.lname && errors.lname?.length ? true : false}
                    value={values.lname}
                    onChange={handleChange}
                    name="lname"
                    label="Last Name"
                    placeholder="last name"
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.lname}
                </FormHelperText>
                <Button
                  onClick={() => {setState(false); setState2(true);}}
                  type="button"
                  variant="contained"
                  style={{marginTop: '20px' , marginLeft:'12%' , marginRight: '12%'}}
                >
                  Next
                </Button>
                
                </>):(
                <>
                  {state2 == true ? (
                  <>
                  <Typography variant="h6" className={className.subTopic}>Login Details</Typography>
                    <FormControl className={className.formCtrl}>
                      <TextField
                        className={className.formCtrl1}
                        error={errors.email && errors.email?.length ? true : false}
                        value={values.email}
                        onChange={handleChange}
                        name="email"
                        label="Email"
                        placeholder="email"
                      />
                  </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.email}
                </FormHelperText>
                <FormControl className={className.formCtrl} >
                  <TextField
                    className={className.formCtrl1}
                    error={errors.password && errors.password?.length ? true : false}
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type={"password"}
                    placeholder="password"
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.password}
                </FormHelperText>
                

                <Button
                  onClick={() => {setState(false); setState2(false);}}
                  type="button"
                  variant="contained"
                  style={{marginTop: '20px' , marginLeft:'12%' , marginRight: '12%'}}
                >
                  Next
                </Button>
                  
                  
                  </>):(<>
                  {state3 == true ? (<>
                    <Typography variant="h6" className={className.subTopic}>Education Details</Typography>
                    <FormControl className={className.formCtrl}>
                      <TextField
                        className={className.formCtrl1}
                        value={values.major}
                        onChange={handleChange}
                        error={errors.major && errors.major?.length ? true : false}
                        name="major"
                        label="major"
                        placeholder="major"
                      />
                  </FormControl>
                  <FormHelperText style={{ color: 'red' }}>
                    {errors.major}
                  </FormHelperText>
                  <FormControl className={className.formCtrl}>
                      <TextField
                        className={className.formCtrl1}
                        value={values.skills}
                        onChange={handleChange}
                        // error={errors.major && errors.major?.length ? true : false}
                        name="skills"
                        label="Your major  Skills"
                        placeholder="Skills"
                      />
                  </FormControl>
                  <Button
                  onClick={() => {setState(false); setState2(false); setState3(false);}}
                  type="button"
                  variant="contained"
                  style={{marginTop: '20px' , marginLeft:'12%' , marginRight: '12%'}}
                >
                  Next
                </Button>
                  
                  
                  </>): (<>
                    <Typography variant="h6" className={className.subTopic}>Education Details</Typography>
                    {/* <FormControl className={className.formCtrl}>
                      <TextField
                        className={className.formCtrl1}
                        value={values.level}
                        onChange={handleChange}
                        // error={errors.major && errors.major?.length ? true : false}
                        name="level"
                        label="Specialized level"
                        placeholder="Specialized level"
                      />
                  </FormControl> */}
                  <InputLabel className={className.formCtrl}>Specialized Level</InputLabel>
                  <Select
                    className={className.formCtrl}
                    sx={{ minWidth: 250 }}
                    value={values.level}
                    onChange={handleChange}
                    name="level"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                   
                    <MenuItem value="Executive management">Executive management</MenuItem>
                    <MenuItem value="Middle management ">Middle management</MenuItem>
                    <MenuItem value="First level management">First level management</MenuItem>
                    <MenuItem value="Intermediate levelt">Intermediate level</MenuItem>
                    <MenuItem value="Entry level">Entry level</MenuItem>
                  </Select>
                  {/* <FormHelperText style={{ color: 'red' }}>
                    {errors.major}
                  </FormHelperText> */}
                  <FormControl className={className.formCtrl}>
                      <TextField
                        className={className.formCtrl1}
                        value={values.qualification}
                        onChange={handleChange}
                        multiline
                        maxRows={4}
                        // error={errors.major && errors.major?.length ? true : false}
                        name="qualification"
                        label="Your Qualifications"
                        placeholder="Skills"
                      />
                  </FormControl>
                  <Button
                    onClick={() => handleSubmit()}
                    type="submit"
                    variant="contained"
                    style={{marginTop: '20px' , marginLeft:'25px' , marginRight: '25px' , backgroundColor: '#017143'}}
                >
                  Sign In
                </Button> 
                  </>)}
                  </>)}                
                </>)}
                
              </>
            );
          }}
        </Formik>
        <div style={{ marginTop:"3rem", textAlign: 'right' }}>
          <img src={jobImg} style={{ width: '300px', height: '200px' }} />
        </div>
      </Box>
    
    </div>
  );

  }
  