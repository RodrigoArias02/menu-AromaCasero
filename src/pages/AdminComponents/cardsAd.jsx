import "./css/cardsAd.css";
import ProductAdminCard from "./productAdminCard.jsx";
import agruparProductos from "../../utils/products.js";

function CardsAd({ products = [] }) {
  const groupedProducts = agruparProductos(products);

  return (
    <div className="container-cards">
      {Object.entries(groupedProducts).map(
        ([category, products]) => (
          <div
            key={category}
            className="div-category-span-admin"
            id={category}
          >
            <span className="text-category">
              <h2>{category}</h2>

              <hr />
            </span>

            <div className="category-products-admin">
              {products.map((product) => (
                <ProductAdminCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default CardsAd;