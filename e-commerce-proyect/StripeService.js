import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PdkkORpT8hZfgO64b1arAK0dDmIuxUAwqT4EJRB3tYu2mGUtpMM8I0L3H0vAKfBILFKsblTZ7MxbtvOHo1xSDb300Szl6eV9D"
);

export async function createCheckoutSession(productIds, quantities) {
  const params = new URLSearchParams();
  productIds.forEach((id) => params.append("productIds", id.toString()));
  quantities.forEach((qty) => params.append("quantities", qty.toString()));

  const response = await fetch(
    `https://e-commerce-test-hqul.onrender.com/api/checkout/create-session?${params.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const session = await response.json();
  const stripe = await stripePromise;
  if (stripe) {
    await stripe.redirectToCheckout({ sessionId: session.id });
  }
}
