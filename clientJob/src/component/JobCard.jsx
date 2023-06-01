import { Box, makeStyles } from "@material-ui/core";
import {
  Button,
  Card,
  Container,
  List,
  ListItem,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Field, Formik } from "formik";
import { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import * as Yup from "yup";
import download from "downloadjs";
const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: "16px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: "16px",
    transition: "box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.15)",
    },
    marginTop: "2rem",
    // marginLeft: '5%',
    width: '550px'
  },
  titleContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  company: {
    color: "#017143",
    fontWeight: "600",
    marginRight: "8px",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  uploadCVTitle: {
    color: "#017143",
    fontWeight: "600",
    marginRight: "8px",
    marginBottom: "3%",
    textDecoration: "none",
    "&:hover": {
      color: "black",
    },
  },
  jobTitle: {
    fontWeight: "600",
  },
  description: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: "14px",
    marginBottom: "16px",
  },
  skills: {
    marginBottom: "8px",
    fontStyle: "italic",
  },
  skill: {
    color: "#28a745",
    fontWeight: "600",
    marginRight: "8px",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  detail: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: "14px",
  },
  bullet: {
    display: "inline-block",
    marginRight: "8px",
    "&::before": {
      content: '""',
      display: "inline-block",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "#017143",
    },
  },

  applyBtn: {
    color: "#fff",
    fontWeight: "600",
    marginRight: "30%",
    marginLeft: "30%",
    marginBottom: "1%",
    backgroundColor: "#017143",
    // "&:hover": {
    //   backgroundColor: '#61876E',
    //   color: 'black'
    // },
  },
}));

export function JobCard(props) {
  const classes = useStyles();
  const [applyBtn, setApplyBtn] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [fileObject, setFileObject] = useState(null);
  const [pdfView, setPdfView] = useState(false);
  const [jobId, setJonId] = useState();
  const [linkId , setLinkId] = useState(-1);
  const [pdfURL, setPdfURL] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [linkApp , setLinkApp] = useState(false);
  // const [email , setEmail] =  useState("");
  // const [userName , setUserName] =  useState("");

  var email = "";
  var name = "";
  var id;
  if (props.applicantEmail && props.applicantName) {
    email = props.applicantEmail;
    // setUserName(props.applicantName);
    name = props.applicantName;
    id = props.jobId;

    console.log(email);
    console.log(name);
    // console.log(id);
  }

  // if(props.jobId) {
  //   setJonId(props.jobId);
  //   console.log(jobId)
  // }
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.log("No file selected");
      enqueueSnackbar("No file selected", { variant: "error" });
      return;
    }

    const formData = new FormData();
    // const formData = {
    //   cv: selectedFile,
    //   applicantEmail : email,
    //   applicantName : name,
    //   appliedJobID : id,
    // };

    formData.append("cv", selectedFile);
    formData.append("applicantEmail", email);
    formData.append("applicantName", name);
    formData.append("appliedJobID", props.jobId);
    // formData.cv = selectedFile;
    // formData.applicantEmail = email;
    // formData.applicantName = name;
    // formData.appliedJobID = id;
    // JSON.parse(formData)
    console.log(JSON.stringify(formData));
    try {
      const response = await axios.post(
        "http://localhost:3000/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      enqueueSnackbar("Uploaded Successfully", { variant: "success" });
      setApplyBtn(!applyBtn);
    } catch (err) {
      const error = err?.response?.data?.err || err?.message;
      console.log(error);
      enqueueSnackbar(error, { variant: "error" });
    }

    // try {
    //   const response = await axios.post('/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log(response.data);
    //   // Handle the response from the server
    // } catch (error) {
    //   console.error(error);
    //   // Handle error if the upload fails
    // }
  };

  const getPDFlink =  useCallback((id , index)=> {
    // console.log(id);

    const PDFlink = async () => {

      const path = "http://localhost:3000/getcvbyID/" + id;

      console.log(path);

      // const res = await axios
      //   .get(path ,  { responseType: 'blob' })
      //   .then((res) => {

      //     // var name = res.data.fname + " " + res.data.lname;
      //     // setUserName(name);
      //     // setEmail(res.data.email);
      //     console.log(res.data);
      //     setPdfURL(res?.data)
      //   });

      //   const blob = await res.blob();
      //   download(blob, "test.pdf");
      try {
        // const response = await axios.get(path);

        //////////////// PDF Veiw
        const response = await axios.get(path, { responseType: "blob" });
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrlData = URL.createObjectURL(pdfBlob);
        enqueueSnackbar("PDF Link Generated", { variant: "info" });
        setPdfURL([pdfUrlData]);
        setLinkApp(!linkApp);
        setLinkId(index);
        ////////////// pdf view done
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error, { variant: "error" });
      }
    };

    PDFlink();
  } , []);

  async function getPDFData(id) {
    // console.log(id);

    const PDFData = async () => {
      const path = "http://localhost:3000/getcvByjobId/" + id;

      // console.log(path);

      // const res = await axios
      //   .get(path ,  { responseType: 'blob' })
      //   .then((res) => {

      //     // var name = res.data.fname + " " + res.data.lname;
      //     // setUserName(name);
      //     // setEmail(res.data.email);
      //     console.log(res.data);
      //     setPdfURL(res?.data)
      //   });

      //   const blob = await res.blob();
      //   download(blob, "test.pdf");
      try {
        const response = await axios.get(path);

        setPdfData(response?.data);
        console.log(pdfData);
        enqueueSnackbar("Data Got Successfully", { variant: "success" });
        //////////////// PDF Veiw
        // const response = await axios.get(path, { responseType: 'blob' });
        // const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        // const pdfUrlData = URL.createObjectURL(pdfBlob);
        // setPdfURL([pdfUrlData]);

        ////////////// pdf view done
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error, { variant: "error" });
      }
    };

    PDFData();
  }
  const sendFile = async (formData) => {
    // const dataInForm = formData;
    formData.applicantEmail = email;
    formData.applicantName = name;
    formData.appliedJobID = props.jobId;
    if (!formData.cv) {
      console.log("no cv");
    }
    console.log(formData.cv);
    setApplyBtn(!applyBtn);

    // setApplyBtn(!)
    try {
      const response = await axios.post(
        "http://localhost:3000/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      enqueueSnackbar("Uploaded Successfully", { variant: "success" });
    } catch (err) {
      const error = err?.response?.data?.err || err?.message;
      console.log(error);
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  return (
    <Card className={classes.card}>
      {applyBtn == true ? (
        <>
          <Container className={classes.titleContainer}>
            <a href={props.companyUrl} className={classes.company}>
              {props.company}
            </a>
            <Typography variant="body2" className={classes.jobTitle}>
              {props.jobTitle}
            </Typography>
          </Container>
          <Typography variant="body1" className={classes.description}>
            {props.description}
          </Typography>
          <Container className={classes.skills}>
            <Typography variant="body2">Skills :</Typography>
            <List dense>
              {props.skill.map((item) => (
                <ListItem key={item} className={classes.detail}>
                  <span className={classes.bullet}></span>
                  {item}
                </ListItem>
              ))}
            </List>
          </Container>
          <Typography variant="body2" className={classes.detail}>
            Job Time: {props.jobStatus}
          </Typography>
          <Typography variant="body2" className={classes.detail}>
            Job Type: {props.jobType}
          </Typography>
          <Typography variant="body2" className={classes.detail}>
            Job Field: {props.feild}
          </Typography>
          <Typography variant="body2" className={classes.detail}>
            Position: {props.position}
          </Typography>
          {props.typeStat === true ? (
            <Button
              onClick={() => {
                setApplyBtn(!applyBtn);
              }}
              sx={{
                color: "#fff",
                fontWeight: "600",
                marginRight: "30%",
                marginLeft: "30%",
                marginBottom: "1%",
                backgroundColor: "#017143",
              }}
              // className={classes.applyBtn}
              variant="contained"
            >
              Apply To Job
            </Button>
          ) : (
            <Container>
              {/* <Button color='error' variant='contained' sx={{marginRight: '5%' , marginTop: '3%'}}>Delete Job</Button> */}

              <Button
                color="success"
                variant="contained"
                onClick={() => {
                  setApplyBtn(!applyBtn);
                  setPdfView(!pdfView);
                  getPDFData(props.jobId);
                }}
                sx={{ marginRight: "5%", marginTop: "3%" }}
              >
                View Applicants
              </Button>
            </Container>
          )}
        </>
      ) : (
        <>
          {pdfView == true ? (
            <div style= {{width:'400px'}}>
              {/* <a href={pdfURL} download>Download PDF</a> */}
              {pdfData.length == 0 || !pdfData ? (<>
              {}
              <br/>
              <Typography variant="h5" sx={{color: 'black'}}>
              No one applied yet.. 🤔 
              </Typography>
              <br/>
              </>
              ): (
                <>
               {pdfData.map((pdfMap, index) => (
                // <div key={index}>
                //   <a href={pdfUrl} target="_blank" rel="noreferrer">
                //     Download PDF {index + 1}
                //   </a>
                // </div>
                <div>
                  
                  <Typography variant="h6" 
                  style={{paddingTop: '2%'}}
                  >
                    {pdfMap.applicantName}{"   "}
                    <Button
                      color="success"
                      variant="contained"
                      onClick={() => {
                        getPDFlink(pdfMap._id , index);
                      }}
                    >
                      Get CV
                    </Button>
                    {linkId == index ? (
                      <div>
                        {pdfURL.map((pdfMap, index) => (
                      <div key={index}>
                        <a href={pdfMap} target="_blank" rel="noreferrer">
                          Download PDF
                        </a>
                      </div>
                    ))}  
                      </div>
                       
                    ):(<>
                    </>)}
                     
                    {/* <Typography>Download </Typography> */}
                  </Typography>
                </div>
                   
                   
                 
              
                
              ))}
              </>
              )}
             

              <Button
                color="success"
                variant="contained"
                onClick={() => {
                  setApplyBtn(!applyBtn);
                  setPdfView(!pdfView);
                  setLinkId(-1);
                  // getPDFlink(props.jobId);
                }}
                sx={{ marginRight: "5%", marginTop: "3%" }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <div>
                <h2 className={classes.uploadCVTitle}>File Upload</h2>
                <form onSubmit={handleFormSubmit}>
                  <input type="file" onChange={handleFileChange} />
                  <button className={classes.uploadCVTitle} type="submit">
                    Upload
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </Card>
  );
}
