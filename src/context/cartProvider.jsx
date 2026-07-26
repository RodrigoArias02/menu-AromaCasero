import {useEffect, useState } from "react";
import { condicionOferta, precioTotalOfertaPorProducto, precioNormalPorKg } from "../utils/products.js";
import { CartContext } from "./cartContext.jsx"

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce(
    (acc, item) => acc + item.price,
    0
  );
  const subTotalCart = cart.reduce(
    (acc, item) => acc +  item.price * item.quantity,
    0
  );
  const totalCart = cart.reduce((total, product) => {
    if (condicionOferta(product)) {
      return total + precioTotalOfertaPorProducto(product);
    } else {
      return total + precioNormalPorKg(product);
    }
  }, 0); // <-- Este 0 es el valor inicial de 'total'
const listCart = cart.map((product) => {
  const tieneOferta =
    product.offer?.kg != null &&
    product.offer?.price != null;

  const precioUnitario = tieneOferta
    ? product.offer.price / product.offer.kg
    : product.price;

  const subtotal =
    precioUnitario * product.quantity;

  return `${product.name} x${product.quantity} - $${subtotal}`;
});

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        listCart,
        subTotalCart,
        totalCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

