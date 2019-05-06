import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class StripePay extends Component {
  render() {
    // DEBUG:
    //debugger;

    return (
      <StripeCheckout
        name="SurveyMail Credits"
        description="$5 for 5 email survey credits"
        amount={500}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}
export default StripePay;
