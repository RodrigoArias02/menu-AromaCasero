import { useState } from "react";
import Quantity from "../../components/contentModalCard/quantity.jsx";
import { SaveIcon } from "../../utils/icons.jsx";
import { updateProduct } from "../../service/db.js";
import { toast } from "sonner";

function ProductAdminCard({ product }) {
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [offerKg, setOfferKg] = useState(product.offer?.kg ?? "");
  const [offerPrice, setOfferPrice] = useState(
    product.offer?.price ?? ""
  );

  const [saving, setSaving] = useState(false);

  const claseColor = (stock) => {
    if (stock === 0) {
      return "rojo";
    }

    if (stock <= 10) {
      return "amarillo";
    }

    return "verde";
  };

const handleSave = async () => {
  try {
    setSaving(true);

    const productData = {
      price: Number(price),
      stock: Number(stock),
      offerkg: offerKg === "" ? null : Number(offerKg),
      offerprice:
        offerPrice === ""
          ? null
          : Number(offerPrice),
    };

    console.log("ID:", product.id);
    console.log("Datos a actualizar:", productData);

    const response = await updateProduct(
      product.id,
      productData
    );

    console.log("Respuesta de Supabase:", response);

    toast.success(
      "Producto actualizado correctamente"
    );
  } catch (error) {
    console.error(
      "Error actualizando producto:",
      error
    );

    toast.error(
      "No se pudieron guardar los cambios"
    );
  } finally {
    setSaving(false);
  }
};

  return (
    <article className="product-admin-card">
      <section className="product-infoAD">
        <header>
          <figure className="product-imageAD">
            <img
              src={product.image}
              alt={product.name}
            />
          </figure>

          <article>
            <h3>{product.name}</h3>

            <p>{product.description}</p>
          </article>

          <p className="product-statusAD">
            <span
              className={`color ${claseColor(stock)}`}
            ></span>
          </p>
        </header>

        <section className="product-actionsAD">
          <div className="contentInputs">
            <label
              className="labelAD"
              htmlFor={`price-${product.id}`}
            >
              Precio
            </label>

            <input
              id={`price-${product.id}`}
              className="input-price"
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />
          </div>

          <div className="contentInputs">
            <label className="labelAD">
              Stock
            </label>

            <Quantity
              
              initial={stock}
              min={1}
              max={100}
              claseMargen="adminQuantity"
              onChange={setStock}
            />
          </div>
        </section>

        <section className="product-actionsAD">
          <div className="contentInputs">
            <label
              className="labelAD"
              htmlFor={`offer-kg-${product.id}`}
            >
              kg oferta
            </label>

            <input
              id={`offer-kg-${product.id}`}
              className="input-price"
              type="number"
              value={offerKg}
              onChange={(e) =>
                setOfferKg(e.target.value)
              }
            />
          </div>

          <div className="contentInputs">
            <label
              className="labelAD"
              htmlFor={`offer-price-${product.id}`}
            >
              precio total oferta
            </label>

            <input
              id={`offer-price-${product.id}`}
              className="input-price"
              type="number"
              value={offerPrice}
              onChange={(e) =>
                setOfferPrice(e.target.value)
              }
            />
          </div>
        </section>

        <button
          className="btn-save"
          onClick={handleSave}
          disabled={saving}
        >
          <SaveIcon />

          {saving
            ? "Guardando..."
            : "Guardar cambios"}
        </button>
      </section>
    </article>
  );
}

export default ProductAdminCard;