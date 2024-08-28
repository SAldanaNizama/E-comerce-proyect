// src/components/Cart.js
import React from "react";
import { useCart } from "./CartContext";
const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    // Aquí llamas a la lógica de Stripe para iniciar el pago
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} unidades
                <button onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Vaciar Carrito</button>
          <button onClick={handleCheckout}>Pagar</button>
        </>
      )}
    </div>
  );
};

export default Cart;
