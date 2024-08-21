import React from "react";
import { useCart } from "./CartProvider";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div>
      <h1>Carrito</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio Total: ${(item.price * item.quantity) / 100}</p>
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Eliminar
            </button>
          </div>
        ))
      )}
      {cart.length > 0 && <button>Proceder al Pago</button>}
    </div>
  );
};

export default CartPage;
