import "./productCard.css";
import notFound from "../../assets/notFoundCard.png";
import { toast } from "sonner";

function ProductCard({
  image,
  name,
  description,
  price,
  offer,
  stock,
  onClick,
}) {
  const hasOffer = offer?.kg != null && offer?.price != null;
  const noStock = stock === 0;

  const handleClick = () => {
    if (noStock) {
      toast.error("El producto no tiene stock en este momento");
      return;
    }

    onClick();
  };

  return (
    <article className="product-card" onClick={handleClick}>
      <article className={`cart-off ${hasOffer ? "" : "none"}`}>
        <p>
          <b>•</b> OFERTA <b>•</b>
        </p>

        <p>{offer?.kg}kg</p>

        <p>OFF</p>
      </article>

      <img
        src={image || notFound}
        alt={name}
        onError={(e) => {
          e.currentTarget.src = notFound;
        }}
      />

      <div className="product-info">
        <h3>{name}</h3>

        <p className="description-info-card">
          {description}
        </p>

        <p className="prices">
          <span className="price">
            $
            {hasOffer
              ? offer.price / offer.kg
              : price}
          </span>

          {hasOffer && (
            <span>
              ${price}
            </span>
          )}
        </p>

        <button className="add-btn">
          AGREGAR (+)
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
