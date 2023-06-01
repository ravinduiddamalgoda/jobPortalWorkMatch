import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
// import "../App.css";
function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <h1 style={{textAlign:'center' , paddingTop: '5%'}}>Need to Proceed Payment First</h1>
       
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
          <Button variant="contained" onClick={() => {setLinkBtn(!linkBtn)}}  sx={{marginLeft: '45%'}}>
            <Link to="/app/cv" >Test Mode</Link>
          </Button>
        </Elements>
        
      )}
      {/* <Button onClick={() => {setLinkBtn(!linkBtn)}}>
      <Link to="/app/cv" >Test Mode</Link>
    </Button> */}
    </>
  );
}

export default Payment;
