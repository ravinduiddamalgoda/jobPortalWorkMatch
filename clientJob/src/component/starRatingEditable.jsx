import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Button, Container } from "@mui/material";
import { AuthContext } from "./AuthProvider";
import { useSnackbar } from "notistack";

export function StarRatingEditable(props) {
  const email = props.email;
  const totalStars = 5;
  const [activeStars, setActiveStars] = useState(0);
  const [click, setClick] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [dataVal, setDataVal] = useState({});
  const [normal , setNormal] = useState(true);
  const token = useContext(AuthContext);

  const handleStarClick = async (val) => {
    setClick(false);
    console.log(val);
    setActiveStars(5 - val);
    const dataVal = parseInt(val);
    try {
      const path = "http://localhost:3000/updaterate/" + email;
      console.log(path);
      const response = await fetch(path, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: dataVal }),
      });

      if (response.ok) {
        const data = await response.json();
        setDataVal(data);
        console.log(data);
        enqueueSnackbar("Edited Success", { variant: "success" });
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (err) {
      console.error(err.message);
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  return (
    <Container>



      {!click ? (
        <>
          {[...Array(totalStars)].map((_, index) => (
            <StarBorderIcon
              key={index}
              onClick={() => {
                setActiveStars(5 - (index + 1));
                setClick(true);
              }}
              style={{ cursor: "pointer" }}
            />
          ))}
        </>
      ) : (
        <>
          {[...Array(totalStars - activeStars)].map((_, index) => (
            <StarIcon key={index} style={{ cursor: "pointer" }} />
          ))}
          <Button variant="contained" sx={{ color:'#fff' , marginRight: '2%'}} onClick={() => handleStarClick(totalStars - activeStars)}>
            Submit
          </Button>
          <Button variant="contained" onClick={() => setClick(!click)}>
            Cancel
          </Button>
        </>
      )}
    </Container>
  );
}
