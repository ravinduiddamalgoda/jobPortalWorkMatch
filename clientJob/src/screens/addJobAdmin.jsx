import { CV_data } from "../component/CV";
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { makeStyles } from '@mui/styles';
import { Typography, makeStyles } from "@material-ui/core";
import { Box, Button, FormControl, FormHelperText, TextField , Container } from '@mui/material';
import { Formik, Form, Field, FieldArray  } from 'formik';
import { Grid } from "@material-ui/core";
import * as Yup from 'yup';
import { useSnackbar } from "notistack";
import { AuthContext } from '../component/AuthProvider';
// import { useSnackbar } from 'notistack';
// import { useSnackbar } from 'notistack';
import axios from 'axios';
import HeaderJob from "../component/JobHeader";
import HeaderJobAdmin from "../component/HeaderJodAdmin";
const useStyle = makeStyles((theme) => ({
    root: {
      backgroundColor: "#FFFFFF",
      marginTop: "2%",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "5%",
      paddingBottom: "5%",
      display: "flex",
      flexDirection: "column",
      paddingTop: "2%",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      padding: "20px",
      width: "80%", 

      [theme.breakpoints.down("sm")]: {
        width: "100%", 
        marginTop: "5%",
        marginBottom: "5%",
        marginLeft: "auto",
      marginRight: "auto",
      },

      [theme.breakpoints.up('450')]: {
        width: "100%", 
        marginTop: "5%",
        marginBottom: "5%",
        marginLeft: "auto",
        marginRight: "auto",
    }

    },
    formCtrl: {
      marginTop: "2rem !important",
      padding: "20px",
      backgroundColor: "#F4F4F4",
      borderRadius: "5px",
      marginBottom: "2rem",
      marginEnd:"2rem!important",
    },
    formCtrl2: {
        marginTop: "2rem !important",
        padding: "20px",
        backgroundColor: "#F4F4F4",
        borderRadius: "5px",
        marginBottom: "2rem",
        marginEnd:"2rem!important",
        fontSize:"1rem",
        marginStart:"0.5rem"
      },
    login: {
      fontFamily: "'Segoe UI', sans-serif",
      flex: "1",
      textAlign: "center",
      color: "#333333",
      marginTop: "2rem !important",
      marginBottom: "2rem !important",
      marginLeft: "auto",
      marginRight: "auto",
    },
    // btnAddSkill:{
    //     background:'#017143',
    //     paddingLeft:"2rem",
    //     paddingRight:"2rem",
    //     marginStart:"2rem !important",
    //     marginTop:"1rem",
    //     marginBottom:"1rem",
    //     color:"white"
    // },
    btnAddSkill:{
        background:'#017143',
        paddingLeft:"2rem",
        paddingRight:"2rem",
        marginStart:"2rem !important",
        marginTop:"1rem",
        marginBottom:"1rem",
        color:"white",
        transition: 'background-color 0.3s ease', 
        '&:hover': {
         background: '#1976d2', 
  },
        
    },
  }));

//   export const dataCVAdd = {}; 
  export function AddJobAdmin() {
    const classes = useStyle();
    const [dataObj , setDataObj] = useState({});
    const [linkBtn , setLinkBtn] = useState(true);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const token = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    
    // console.log(linkBtn);
    // const history = useHistory();
    // dataCVAdd = dataObj;
    const dataPass = async(formData) => {
        formData.recuiterEmail = "admin@gmail.com";
       
        setDataObj(formData);

        console.log(dataObj);
        try {
          const res = await axios.post('http://localhost:3000/addJob',dataObj);
          console.log(res);
          enqueueSnackbar("Uploaded Successfully", { variant: "success" });
          navigate('/admin');
        } catch (err) {
          // console.log(res);
          const error = err.message;
          //  enqueueSnackbar(error, { variant: 'error' });
        }
       
    }


    // useEffect(() => {
    //     try {
    //       const currentUser = async () => {
    //         const res = await axios
    //           .get("http://localhost:3000/current-recruiter", {
    //             headers: {
    //               Authorization: "Bearer " + token.token,
    //             },
    //           })
    //           .then((res) => {
              
    //             setUserName(res.data.email);
    //             console.log(res.data.email);
    //           });
    //       };
    
    //       if (token) {
    //         resData = currentUser();
    //       }
    //     } catch (err) {
    //       // enqueueSnackbar(err, { variant: "error" });
    //     }
    //   }, [token]);


    // useEffect(() => {
    //   try {
    //     const currentUser = async () => {
    //       try {
    //         const response = await fetch("http://localhost:3000/current-recruiter", {
    //           headers: {
    //             Authorization: "Bearer " + token.token,
    //           },
    //         });
    
    //         if (response.ok) {
    //           const data = await response.json();
    //           setUserName(data.email);
    //           console.log(data.email);
    //           enqueueSnackbar("Data Got Success", { variant: "success" });

    //         } else {
    //           throw new Error("Request failed with status: " + response.status);
    //         }
    //       } catch (error) {
    //         // Handle error
    //         console.error(error);
    //         enqueueSnackbar(error.message, { variant: "error" });
    //       }
    //     };
    
    //     if (token) {
    //       currentUser();
    //     }
    //   } catch (err) {
    //     // enqueueSnackbar(err, { variant: "error" });
    //   }
    // }, [token]);
    

   
  
        return (
            <>


            <Container>
              <HeaderJobAdmin/>
                <Box className={classes.root}>
                  <Formik
                    initialValues={{

                         
                        jobTitle:"" ,
                        jobStatus : "" , 
                        jobType : "" ,   
                        feild : "" ,  
                        position : "" , 
                        skill : [],
                        description:""
                      // email: "",
                    }}

                    onSubmit = {dataPass}
                  >
                    {({ values, handleChange, handleSubmit }) => {
                      return (
                        <div>
                          <Typography variant="h4" className={classes.login}>
                            Post Job By NSBM
                          </Typography>
                          

                          <Grid container spacing={2}>
                              {/* <Grid item xs={12} sm={12}>
                                  <FormControl className={classes.formCtrl} fullWidth>
                                      <TextField
                                          value={values.recuiterEmail}
                                          onChange={handleChange}
                                          name="recuiterEmail"
                                          label="Email"
                                        //   disabled
                                          placeholder="Full Name"
                                          sx={{ width:"100%"}}
                                      />
                                  </FormControl>
                              </Grid> */}
                              <Grid item xs={12} sm={6}>
                                  <FormControl className={classes.formCtrl} fullWidth>
                                      {/* <TextField
                                          sx={{ width:"100%"}}
                                          value={values.degree}
                                          onChange={handleChange}
                                          name="Degree"
                                          label="Degree"
                                          placeholder="Degree"
                                      /> */}
                                      <TextField
                                          sx={{ width:"100%"}}
                                          value={values.jobTitle}
                                          onChange={handleChange}
                                          name="jobTitle"
                                          label="Job Title"
                                          placeholder="Job Title"
                                      />
                                  </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                  <FormControl className={classes.formCtrl} fullWidth>
                                      <TextField
                                          sx={{ width:"100%"}}
                                          value={values.jobStatus}
                                          onChange={handleChange}
                                          name="jobStatus"
                                          label="Job Status"
                                          placeholder="Job Time Period"
                                      />
                                  </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                  <FormControl className={classes.formCtrl} fullWidth>
                                      <TextField
                                           sx={{ width:"100%"}}
                                          value={values.jobType}
                                          onChange={handleChange}
                                          name="jobType"
                                          label="Job Type"
                                          placeholder="Tempory / Fulltime / Part Time"
                                      />
                                  </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                  <FormControl className={classes.formCtrl} fullWidth>
                                      <TextField
                                         sx={{ width:"100%"}}
                                          value={values.feild}
                                          onChange={handleChange}
                                          name="feild"
                                          label="Job Feild"
                                          placeholder="Job Feild"
                                      />
                                  </FormControl>
                              </Grid>
                          </Grid>

                          <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                  <FormControl className={classes.formCtrl} fullWidth>
                                      <TextField
                                           sx={{ width:"100%"}}
                                          value={values.position}
                                          onChange={handleChange}
                                          name="position"
                                          label="position"
                                          placeholder="Intern / Senior / Assiociate" />
                                  </FormControl>
                              </Grid>
                              
                          </Grid>
                          <Grid item xs={12} sm={6}>

                <Typography variant="h6"> Skills</Typography>
                <FieldArray
                    name="skill"
                    render={(arrayHelpers) => (
                      <div>
                        {values.skill && values.skill.length > 0 ? (
                          values.skill.map((skill, index) => (
                            <div key={index}>
                              <Field
                                name={`skill.${index}`}
                                className={classes.formCtrl2}
                              />

                              <Button
                                 sx={{ background:'#017143',
                                 paddingLeft:"2rem",
                                 paddingRight:"2rem",
                                 marginStart:"2rem !important",
                                 marginTop:"1rem",
                                 marginBottom:"1rem",
                                 color:"white",
                                 transition: 'background-color 0.3s ease', 
                                 '&:hover': {
                                  background: '#1976d2', 
                              },
                                 }}
                                className={classes.btnAddSkill}
                                type="button"
                                onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                              >
                                Add
                              </Button>
                              <Button
                                 sx={{ background:'#017143',
                                 paddingLeft:"2rem",
                                 paddingRight:"2rem",
                                 marginStart:"2rem !important",
                                 marginTop:"1rem",
                                 marginBottom:"1rem",
                                 color:"white",
                                 transition: 'background-color 0.3s ease', 
                                 '&:hover': {
                                  background: '#1976d2', 
                              },
     
     
                                 }}
                                className={classes.btnAddSkill}
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                              >
                                Remove
                              </Button>
                            </div>
                          ))
                        ) : (
                          <Button
                            type="button"
                            sx={{ background:'#017143',
                            paddingLeft:"2rem",
                            paddingRight:"2rem",
                            marginStart:"2rem !important",
                            marginTop:"1rem",
                            marginBottom:"1rem",
                            color:"white",
                            transition: 'background-color 0.3s ease', 
                            '&:hover': {
                             background: '#1976d2', 
                         }, }}
                            onClick={() => arrayHelpers.push("")}
                            className={classes.btnAddSkill}
                          >
                            {/* show this when user has removed all friends from the list */}
                            Add Your Skills
                          </Button>
                        )}
                      </div>
                    )}
                  />
                 </Grid>
                         

                          <Grid container spacing={2}>
                          <Grid item xs={12} sm={12}>
                                  <FormControl className={classes.formCtrl} fullWidth>
                                      <TextField
                                          value={values.description}
                                          onChange={handleChange}
                                          name="description"
                                          label="description"
                                          multiline
                                          rows={4}

                                          placeholder="Full Name"
                                          sx={{ width:"100%"}}
                                      />
                                  </FormControl>
                              </Grid>
                              
                             
                          </Grid>
                          <Grid item xs={12} sm={2}>
                                  <Button
                                      onClick={() => handleSubmit()}

                                      type="submit"
                                      variant="contained"
                                      sx={{marginTop: '20px' , backgroundColor:"#017143" , width:"100%"}}>
                                      Post Job
                                  </Button>
                              </Grid>

                                  </div>
                                  );
                              }}  
                          </Formik>
                      </Box>
                      {/* <CV_data />         */}

                  </Container>








              </>
          );
    }
  


