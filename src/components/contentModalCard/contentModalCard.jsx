import { useState } from "react";
import "./contentModalCard.css";
import ProductDetails from "./product-detail.jsx";
import Quantity from "./quantity.jsx";
import { toast } from "sonner";
import notFound from "../../assets/notFoundCard.png";
import { useCart } from "../../hooks/useCart.jsx";
import ButtonIcon from "../buttons/buttonIcon.jsx";
import { CartIcon, LabelIcon, StarIcon } from "../../utils/icons.jsx";
const ContentModalCard = ({ product }) => {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const hasOffer = product.offer?.kg != null;
  const hasUnitsPerKg = product.unidadesPorKg != null;
  const hasStock = product.stock > 0;

  const ahorro = hasOffer
    ? product.offer.price - product.price
    : null;

  const productoAnadir = () => {
    if (!hasStock) {
      toast.error("El producto no tiene stock en este momento");
      return;
    }

    addToCart(product, quantity);
    toast.success("Producto agregado al carrito");
  };

  return (
    <div className="content-modal-card">
      <div className="container-img">
        <img
          src={product.image || notFound}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = notFound;
          }}
        />
      </div>

      <h2>{product.name}</h2>

      <h3>4 pack - premium blend</h3>

      <p className="description-card">
        {product.description}
      </p>

      <ProductDetails product={product} />

      {hasOffer && (
        <span className="label">
          <LabelIcon />

          <p>
            Ahorras <b>${ahorro}</b> llevando 2kg
          </p>
        </span>
      )}

      <Quantity
        initial={1}
        min={1}
        max={product.stock}
        claseMargen="quantity-card-modal"
        onChange={setQuantity}
        unit={product.unit}
      />

      {hasUnitsPerKg && (
        <span className="label">
          <StarIcon />

          <p>
            Cantidad: 1kg ({product.unidadesPorKg} unidades)
          </p>
        </span>
      )}

      <ButtonIcon
        clase="btnAddCart"
        nombre="Agregar al carrito"
        onclick={productoAnadir}
        icon={<CartIcon />}
      />
    </div>
  );
};

export default ContentModalCard;