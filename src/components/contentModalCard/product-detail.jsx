const ProductDetail = ({ product }) => {  
  let discountPercentage;
  let priceOfferPerKg;
  let claseLinea="";
  // Hacemos todos los cálculos solo si existe la oferta
  if (product.offer.kg != null) {
    priceOfferPerKg = product.offer.price / product.offer.kg;
    discountPercentage = Math.round((1 - priceOfferPerKg / product.price) * 100);
    claseLinea="lineThrough"
  }

  return (
    <div className="product-details">
      <section className="price-normal">
        <p>Precio Normal</p>
        <p className={claseLinea}>${product.price} / kg</p>
      </section>

    
        <section className="price-offer">
          {product.offer.kg != null && (
            <div>
            <p>Oferta {product.offer.kg}kg</p>
            <span className="price-card">
              <p>${product.offer.price}</p>
              <p className="p-discuent">-{discountPercentage}%</p>
            </span>
            <p>(${priceOfferPerKg} / kg)</p>
            </div>
          )}
        </section>
      
    </div>
  );
};

export default ProductDetail;