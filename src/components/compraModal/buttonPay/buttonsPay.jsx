import "./buttonPay.css";

import { CardIcon, MoneyIcon, BankIcon } from "../../../utils/icons.jsx";

// 1. Definimos los métodos de pago con sus propiedades(refactorizando)
const PAYMENT_METHODS = [
  {
    id: "efectivo",
    label: "Efectivo",
    Icon: MoneyIcon,
  },
  {
    id: "transferencia",
    label: "Transferencia",
    Icon: BankIcon,
  },
];

function ButtonPay({pay, setPay}) {
  
  return (
    <div className="div-pay">
      <h3><span><CardIcon /></span>Método de pago</h3>
      
      <section className="section-pay">
        {/* 2. Recorremos el array para renderizar un único botón dinámico */}
        {PAYMENT_METHODS.map(({ id, label, Icon }) => (
          <button
            key={id} // Clave única obligatoria en React para los ciclos
            type="button"
            className={`pay ${pay === id ? "active" : ""}`}
            onClick={() => setPay(id)}
          >
            {/* Renderizamos el componente del ícono dinámicamente */}
            <Icon />

            <span className="pay-text">{label}</span>

            <span className={`radio ${pay === id ? "active" : ""}`}>
              {pay === id && <span className="radio-dot" />}
            </span>
          </button>
        ))}
      </section>
    </div>
  );
}

export default ButtonPay;