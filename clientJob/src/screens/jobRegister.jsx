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
    paddingLeft: '15%',
    fontWeight: 700
  }
  
}));

export function RegisterJobRe(){

  const className = useStyles();
  // const className = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();


  const makeRegistration = async (formData) => {
    try {
      const res = await axios.post('http://localhost:3000/recruiter-register', {
        ...formData,
      });
      // console.log(res);
      enqueueSnackbar('Succesfully Registered', { variant: 'success' });
      navigate('/login');
    } catch (err) {
      console.log(res);
      const error = err.message;
       enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const SignupSchema = Yup.object().shape({
    companyName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
      recruiterName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8 , 'Password must have atleast 8 characters'),
    companyMajor: Yup.string().required()
    
  });

  return(

    <div className={className.backGroundImg}>
      
     {/* <img src={backImg} className={className.backGroundImg}/> */}
      <Box className={className.root}>
        <Formik
          initialValues={{
            companyName: "",
            recruiterName: "",
            email: "",
            password: "",
            companyMajor:""
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
                <Typography variant="h4" className={className.registrationName}>Reqruiter Registration</Typography>
                
                <FormControl className={className.formCtrl} variant="outlined">
                  <TextField
                    
                    className={className.formCtrl1} 
                    value={values.companyName}
                    onChange={handleChange}
                    name="companyName"
                    label="Company Name"
                    placeholder="Company Name"
                    error={errors.companyName && errors.companyName?.length ? true : false}
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.companyName}
                </FormHelperText>
                <FormControl className={className.formCtrl}>
                  <TextField
                    className={className.formCtrl1}
                    error={errors.recruiterName && errors.recruiterName?.length ? true : false}
                    value={values.recruiterName}
                    onChange={handleChange}
                    name="recruiterName"
                    label="Recruiter Name"
                    placeholder="Recruiter Name"
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.recruiterName}
                </FormHelperText>
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
                <FormControl className={className.formCtrl}>
                  <TextField
                    className={className.formCtrl1}
                    value={values.companyMajor}
                    onChange={handleChange}
                    error={errors.companyMajor && errors.companyMajor?.length ? true : false}
                    name="companyMajor"
                    label="Company Major"
                    placeholder="company Major"
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.major}
                </FormHelperText>

                <Button
                  onClick={() => handleSubmit()}
                  type="submit"
                  variant="contained"
                  style={{marginTop: '20px' , marginLeft:'10px' , marginRight: '10px'}}
                >
                  Submit
                </Button>
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
  