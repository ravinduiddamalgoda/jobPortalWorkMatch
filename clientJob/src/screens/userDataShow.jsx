
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { AuthContext } from "../component/AuthProvider";
import {
  Card,
  Container,
  InputAdornment,
  List,
  ListItem,
  Table,
  TableCell,
  TableRow,
  TextField,
  Grid
} from "@mui/material";
import { Box, Typography, makeStyles } from "@material-ui/core";
import HeaderJob from "../component/JobHeader";
import workingImg from '../Images/working.png';

const useStyle = makeStyles((theme) => ({ 
    root:{

        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        // padding: "16px",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.15)",
        },
        marginTop: "2rem",
        width: '50%' , 
        paddingLeft: '2%' , 
        // marginLeft: '10%' ,
        height:'70vh',
        marginLeft: 'auto' ,
        marginRight: 'auto'

    }, 
    
 }));
export function UserDataShow() {
  const { email } = useParams();
  const classes = useStyle();
  const token = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [dataVal , setDataVal] = useState({});

  useEffect(() => {
    try {
      const currentData = async () => {
        try {
          const path = "http://localhost:3000/userbymail/" + email;
          const response = await fetch(path, {
            headers: {
              Authorization: "Bearer " + token.token,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setDataVal(data);
            // setUserName(data.email);
            console.log(dataVal);
            // data.map((item) => (

            // ));
            
            enqueueSnackbar("Data Got Success", { variant: "success" });

          } else {
            throw new Error("Request failed with status: " + response.status);
          }
        } catch (error) {
          // Handle error
          console.error(error);
          enqueueSnackbar(error.message, { variant: "error" });
        }
      };
  
      
        currentData();
     
    } catch (err) {
      // enqueueSnackbar(err, { variant: "error" });
    }
  }, []);
  return (
    <>
        <HeaderJob />
        
     
            
           
            <Box className={classes.root}>
                <img src={workingImg} width='20%' style={{marginLeft: 'auto' , marginRight: 'auto' }}/>
                <Typography variant="h3" style={{marginLeft: 'auto' , marginRight: 'auto' , fontFamily: 'Copperplate' , color: '#017143' , paddingTop: '12px' , paddingBottom: '12px' }}>User Details</Typography>
                <Typography variant="h5">First Name: {dataVal.fname} </Typography>
                <Typography variant="h5">Last Name: {dataVal.lname} </Typography>
                <Typography variant="h5">email: {dataVal.email} </Typography>
                <Typography variant="h5">Specialized Level: {dataVal.major} </Typography>
                <Typography variant="h5">skills: {dataVal.skills} </Typography>
                <Typography variant="h5">Qualification: {dataVal.qualification} </Typography>
            </Box>
            
    
            
            
            
      
        
    </>
  );
}
