import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button, makeStyles } from "@material-ui/core";
import "../App.css";
// const useStyles = makeStyles((theme) => ({
//   boxStyle: {
//     border: "1px solid",
//     [theme.breakpoints.up("900")]: {
//       width: "600px",
//     },
//     [theme.breakpoints.down("900")]: {
//       width: "600px",
//     },
//     [theme.breakpoints.down("600")]: {
//       width: "300px",
//     },
//     // background: '#4EB5FF',
//     marginLeft: "15%",
//     marginRight: "15%",
//     borderRadius: "0px",
//     marginTop: "3%",
//   },
//   btn: {
//     background:'#017143'
//   }
// }));



export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  // const className = useStyles();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/app/cv`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <div id="payment">
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
     
      <button disabled={isProcessing || !stripe || !elements} id="submit"> <span id="button-text" style={{color:'#017143' , maxWidth:'500px' , borderRadius: '2px'}}>
          {isProcessing ? "Processing ... " : "Pay now"}
        </span></button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message" style={{color: 'red'}}>{message}</div>}
    </form>
    
    </div>
  );
}
