import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { makeStyles } from '@mui/styles';
import { Typography, makeStyles } from "@material-ui/core";
import { Box, Button, FormControl, FormHelperText, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../component/AuthProvider';
import jobImg from '../assets/job.png'
import Logo from '../assets/loginLogo.png'
// import { useSnackbar } from 'notistack';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const useStyle = makeStyles((theme)=>({
  root: {
    background: "white",
    // height: "100vh",
    // margin: "0 auto",
    // marginTop: '2%',
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginBottom: '5%',
    // paddingBottom: '2%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    // paddingTop:'2%',
    // boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    // paddingBottom: '0%', 
    // borderColor: 'black',
    // background: "white",
    // borderRadius: '10px',
    // // borderBlockWidth :'thick',
    // border: 'solid',
    // borderTopColor: '#824AAF',
    // borderRightColor: '#824AAF',
    // borderLeftColor: '#824AAF',
    // borderBottomColor: '#824AAF',

    [theme.breakpoints.up('900')]: {
      width: '50%',
    },
    [theme.breakpoints.down('900')]: {
      width: '60%',
    },
    [theme.breakpoints.down('600')]: {
      width: '95%',
    },

  },
  formCtrl: {
    marginTop: '10px',
    padding: '3%'  
  },
  login: {
    fontFamily: '"Segoe UI"',
    // paddingLeft: '13%'
    flex: '1',
    textAlign: 'center',
  }

}))


// const useStyles = makeStyles({
//     root: {
//       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//       border: 0,
//       borderRadius: 3,
//       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//       color: 'white',
//       height: 48,
//       padding: '0 30px',
//     },
//   });

export function LoginPage(){
    const classes = useStyle();
    // let{ init } = useContext(AuthContext);
    let { init } = useContext(AuthContext);
    const navigate = useNavigate();
    // const {enqueueSnackbar} = useSnackbar();
    const{enqueueSnackbar} = useSnackbar();
    

    const saveToken = async ( payload) => {
      await localStorage.setItem('token' , JSON.stringify(payload))
    }

    const makeLogin = async (formData) => {
      try {
        const res = await axios.post('http://localhost:3000/login', {
          ...formData,
        });
        console.log(res.data);
        // alert(res.data);
        await saveToken(res?.data);
        enqueueSnackbar('Succesfully Logged In', { variant: 'success' });
        // console.log("done");
        if(!init){
          // console.log("init in");
          await init();
        }
        setTimeout(()=>{ navigate('/app');} , 500);
       
        // window.location.reload();
        // useEffect(() => {
         
        //       // console.log("redirect to app...");
        //     navigate("/app");
          
        //   // eslint-disable-next-line react-hooks/exhaustive-deps
        // }, []); 
      } catch (err) {
        const error = err?.response?.data?.err || err?.message;
        console.log(error);
        enqueueSnackbar(error, { variant: 'error' });
      }
    };
    
    return (
      <Box style={{ width : '100%' , height:'100%' , margin: 'auto auto'}}>
      <Box className={classes.root}>
        <Formik 
          initialValues={{
            email: "",
            password: "",
          }}
          
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Provide an valid email').required(),
            password: Yup.string().required(),
          })}
          onSubmit = {makeLogin}

        >
          {({values, handleChange, handleSubmit}) => {
            return (
              <>
               {/* <div style={{ textAlign: 'left' }}>
                  <img src={Logo} style={{ width: '70px', height: '70px' , marginLeft:"2rem"}} />
                </div> */}
                <Typography variant="h4" className={classes.login}>Job Seeker Login</Typography>
              
                <FormControl className={classes.formCtrl} style={{marginTop: '20px' , marginLeft:'10px' , marginRight: '10px'}}>
                  <TextField
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    label="Email"
                    placeholder="email"
                    
                  />
                </FormControl>
                
                <FormControl className={classes.formCtrl} style={{marginTop: '20px', marginLeft:'10px' , marginRight: '10px'}}>
                  <TextField
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type={"password"}
                    placeholder="password"
                  />
                </FormControl>

                <Button
                  onClick={() => handleSubmit()}
                  type="submit"
                  variant="contained"
                  style={{marginTop: '20px' , marginLeft:'25px' , marginRight: '25px'}}
                >
                  LOGIN
                </Button>
               
                {/* <div style={{ marginTop:"3rem", textAlign: 'right' }}>
                  <img src={jobImg} style={{ width: '300px', height: '200px' }} />
                </div> */}
               
             </>
            );
          }}
        </Formik>
        <Link to="/register" >
          <Typography style ={{marginLeft: '27%', color: '#2691D9' , textDecoration: 'none' , paddingTop: '2%'}}>New User ? Click To register</Typography>
        </Link>
      </Box>
   
      </Box>
    );
  }
  