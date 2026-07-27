import "./contentModalCart.css";
import Quantity from "../contentModalCard/quantity.jsx";
import { TrashIcon } from "../../utils/icons.jsx";
import { useCart } from "../../hooks/useCart.jsx";
import {
  condicionOferta,
  precioNormalPorKg,
  precioOfertaPorKg,
  descuentoPorProducto,
  descuentoTotalProductos,
  porcentajeDescuento,
  precioTotalOfertaPorProducto,
} from "../../utils/products.js";

function ContentModalCart({ onSiguientePaso }) {
  const { clearCart, cart, totalCart, subTotalCart, removeFromCart } =
    useCart();
  const descuentoTotal = descuentoTotalProductos(cart);

  return (
    <aside className="cart-modal">
      <header className="cart-header">
        <p>{cart.length} productos</p>
      </header>

      <section className="cart-products-list">
        {cart.map((product) => {
          const enOferta = condicionOferta(product);

          return (
            <article className="cart-item" key={product.id}>
              <div className="cart-item-img-container">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="cart-item-info">
                <header className="cart-item-top">
                  <h3>{product.name}</h3>
                  <button
                    className="delete-btn"
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Eliminar producto"
                  >
                    <TrashIcon />
                  </button>
                </header>

                <div className="cart-item-details">
                  <div className="price-kg-selector">
                    <div className="kg-prices">
                      <p
                        className={
                          enOferta
                            ? "price-original line-through"
                            : "price-original"
                        }
                      >
                        ${product.price} / kg
                      </p>
                      {enOferta && (
                        <p className="price-offer-kg">
                          ${precioOfertaPorKg(product)} / kg
                        </p>
                      )}
                      {enOferta && (
                        <span className="discount-badge">
                          {porcentajeDescuento(product)}
                        </span>
                      )}
                    </div>

                    <div className="quantity-selector">
                      <Quantity
                        id={product.id}
                        initial={product.quantity}
                        min={1}
                        max={100}
                        claseInput="paddingAndWidth"
                        claseMargen="margin-quantity"
                      />
                    </div>
                  </div>

                  <div className="price-totals-container">
                    {enOferta && (
                      <div className="price-before">
                        <p>Antes</p>
                        <p>${precioNormalPorKg(product)}</p>
                      </div>
                    )}

                    <div className="price-now">
                      {enOferta && <p>Ahora</p>}
                      <h4>${precioTotalOfertaPorProducto(product)}</h4>
                      {enOferta && (
                        <p className="savings-text">
                          Ahorrás: ${descuentoPorProducto(product)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <div className="cart-banner-offer">
        <p>
          ¡Hacé tu pedido con <strong>2 hs</strong> de anticipación y asegurá la
          disponibilidad de tus productos!
        </p>
      </div>

      <footer className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subTotalCart}</span>
        </div>

        <div className="summary-row discount-row">
          <span>Descuento</span>
          <span className="discount-amount">-${descuentoTotal}</span>
        </div>

        <hr className="summary-divider" />

        <div className="summary-row total-row">
          <span>TOTAL</span>
          <span>${totalCart}</span>
        </div>

        <button className="btn-confirm" onClick={totalCart==0?"":onSiguientePaso}>
          CONFIRMAR PEDIDO
        </button>

        <button className="btn-clear" onClick={clearCart}>
          <TrashIcon /> VACIAR CARRITO
        </button>
      </footer>
    </aside>
  );
}

export default ContentModalCart;
