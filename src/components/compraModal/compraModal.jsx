import "./compraModal.css";
import { useState, useMemo } from "react";
import {validarDatos} from "../../utils/products.js"
import {calcularEnvio} from "../../utils/shipping.js"
import {useCart} from "../../hooks/useCart.jsx"
import { generarMensajePedido } from "../../utils/shipping.js";

import ButtonPay from "./buttonPay/buttonsPay.jsx";
import AddressMap from "./addressMap/addressMap.jsx";
import Hours from "./hours/hour.jsx";
import DivInput from "./divInput/divInput.jsx";
import Total from "./total/total.jsx";

function ComprarModal() {
  const [pay, setPay] = useState(null);
  const [datos, setDatos] = useState({})
  const [cliente, setCliente] = useState({nombre: "", telefono: "",});
  const [hour, setHour] = useState("19hs"); 
  const { totalCart, listCart } = useCart();
  const telefono = "5492262631289"; // sin + ni espacios
  const listadoProductos = listCart.join("\n");

  
  const handleWhatsAppClick = () => {
    if (!validarDatos(cliente,datos,pay)) return;
    const mensaje=generarMensajePedido(cliente,datos,pay, hour, totalCart,listadoProductos)
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };


const envio = useMemo(() => {
  const { latitude, longitude } = datos || {};
  
  // Si no hay coordenadas, devolvemos el estado por defecto
  if (!latitude || !longitude) {
    return { nombre: "Calculando...", costo: 0 };
  }

  // De lo contrario, calculamos y devolvemos el resultado de inmediato
  return calcularEnvio(latitude, longitude);

// El cálculo solo se ejecutará si cambian la latitud o la longitud
}, [datos]);

  return (
    <div className="div-modalCompra">
      <DivInput setCliente={setCliente} nombre={cliente.nombre} telefono={cliente.telefono}/>
      <ButtonPay pay={pay} setPay={setPay} />
      <Hours hour={hour} setHour={setHour}/>
      <AddressMap setDatos={setDatos} />
      <Total costo={envio.costo} handleWhatsAppClick={handleWhatsAppClick} totalCart={totalCart}/>
    </div>
  );
}

export default ComprarModal;
