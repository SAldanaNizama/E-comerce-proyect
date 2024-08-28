// src/components/Cart/Cart.js
import React from "react";
import { useCart } from "./CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PdkkORpT8hZfgO64b1arAK0dDmIuxUAwqT4EJRB3tYu2mGUtpMM8I0L3H0vAKfBILFKsblTZ7MxbtvOHo1xSDb300Szl6eV9D"
);

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const productId = cart.map((item) => item.productId);
    const quantitys = cart.map((item) => item.quantity);

    const params = new URLSearchParams();
    productId.forEach((productId) =>
      params.append("productIds", productId.toString())
    );
    console.log(productId);
    quantitys.forEach((qty) => params.append("quantitys", qty.toString()));

    const response = await fetch(
      `https://e-commerce-test-hqul.onrender.com/api/checkout/create-session?${params.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log();
    const session = await response.json();

    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  if (cart.length === 0) {
    return <div className="text-center mt-10">Tu carrito está vacío</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between mb-4">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleCheckout}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Pagar con Stripe
      </button>
      <button
        onClick={clearCart}
        className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 ml-2"
      >
        Vaciar Carrito
      </button>
    </div>
  );
};

export default Cart;
