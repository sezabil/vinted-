import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = (title, price) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  const handlePayment = async (event) => {
    try {
      event.preventDefault();
      //Etape 1 : récupérer le numéro de carte
      const cardInfos = elements.getElement(CardElement);
      //   console.log(cardElement);

      //Etape 2 : Envoyer ces données à l'api de stripe
      const stripeResponse = await stripe.createToken(cardInfos);

      //   console.log(stripeResponse);
      // Etape 3: envoi du token à mon serveur
      console.log({
        stripeToken: stripeResponse.token.id,
        amount: price,
        title: title,
      });
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeResponse.token.id,
          amount: price,
          title: title,
        }
      );
      if (response.data.status === "succeeded") {
        console.log("Payment réussi !!");
        setCompleted(true);
      }
    } catch (error) {}
  };
  return (
    <div>
      {completed ? (
        <h1>Payment confirmé ! ? </h1>
      ) : (
        <form onSubmit={handlePayment}>
          <CardElement />
          <input type="submit" value="Payer" />
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
