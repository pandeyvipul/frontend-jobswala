import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import "./Payment.css"
const Payment = () => {
  const makepayment = async () => {
    const stripe = await loadStripe("pk_test_51QSto4Gl0axXamlKfYssZ6abZyMsBjCiJdxUpVCFVhdqmHhGgA8ECT18MqlYQySazyjQoN4Ogbo2dDYYRiAx28M700xPDO8vrL");
    const res = await fetch("https://backend-jobswala.onrender.com/payment/companys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { id } = await res.json();
    localStorage.setItem("order", JSON.stringify(id));
    console.log(id);
    const stripen = await stripe;
    await stripen.redirectToCheckout({ sessionId: id });
  }


  const makestudents = async () => {
    const stripe = await loadStripe("pk_test_51QSto4Gl0axXamlKfYssZ6abZyMsBjCiJdxUpVCFVhdqmHhGgA8ECT18MqlYQySazyjQoN4Ogbo2dDYYRiAx28M700xPDO8vrL");
    const res = await fetch("https://backend-jobswala.onrender.com/payment/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { id } = await res.json();
    console.log("id hai ye", id);
    localStorage.setItem("order", JSON.stringify({ id }));
    console.log("Payment session ID saved:", id);

    let order = JSON.parse(localStorage.getItem("order"));
    console.log(order.id); // Will correctly log the ID

    const stripen = await stripe;
    await stripen.redirectToCheckout({ sessionId: id });
  }

  return (

    <div className="payment-section">
      <h1>Payment</h1>
      <p>Please select the type of payment:</p>

      <button className="payment-button" onClick={makepayment}>
        For Company Payment
      </button>

      <button className="payment-button" onClick={makestudents}>
        For Students Payment
      </button>
    </div>

  )
}

export default Payment
