import React from "react";
import { createCheckoutSession } from "@../../../StripeService";
const CheckoutButton = ({ productIds, quantities }) => {
  const handleCheckout = async () => {
    await createCheckoutSession(productIds, quantities);
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      Pagar con Stripe
    </button>
  );
};

export default CheckoutButton;
