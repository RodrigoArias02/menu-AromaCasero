import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
const Quantity = ({id, initial, min, max, onChange, claseInput, claseMargen, unit="kg" }) => {
  const [quantity, setQuantity] = useState(initial);
  const {updateQuantity}=useCart()

  
  const updateQuantitySelector = (nextValue) => {
    const value = Math.max(min, Math.min(max, nextValue));
    setQuantity(value);
    updateQuantity(id,value)
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={"quantity "+ claseMargen}>
      <button type="button" onClick={() => updateQuantitySelector(quantity - 1)} disabled={quantity <= min}>
        <i className="fa-solid fa-minus"></i>
      </button>
      <div className="quantity-value">
        <input
          type="number"
          value={quantity}
          readOnly
          className={claseInput}
        />
        <span>{unit}</span>
      </div>
      <button
        type="button" onClick={() => updateQuantitySelector(quantity + 1)}disabled={quantity >= max}>
          <i className="fa-solid fa-plus" ></i>
      </button>
      
    </div>
  );
};

export default Quantity;
