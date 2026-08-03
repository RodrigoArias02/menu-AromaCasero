import combos from "../assets/combo.png";
import burguer from "../assets/iconoburguer.png";
import chori from "../assets/chori.png";
import vaca from "../assets/vaca.png";
import pollo from "../assets/gallina.png";
import milas from "../assets/milanesas.png";


export const estaAbierto = () => {
  const ahora = new Date();
  const hora = ahora.getHours();
  const minutos = ahora.getMinutes();

  const horaDecimal = hora + minutos / 60;

  return horaDecimal >= 7 && horaDecimal < 21;
};
export const categoryOrder = {
  milanesas: ["Rebozadas artesanalmente y listas para cocinar."],
  hamburguesas: ["Blends premium con todo el sabor de la carne vacuna."],
  pollo: ["Pollo fresco y preparado con la mejor calidad."],
  carne: ["Cortes seleccionados para cada ocasión."],
  chorizos: ["Tradición, sabor y calidad para tu parrilla."],
  combos: ["Más variedad y ahorro en una sola compra."],
};
export const categories = [
  { id: "milanesas", name: "Milanesas", image: milas },
  { id: "hamburguesas", name: "Hamburguesas", image: burguer },
  { id: "pollo", name: "Aves", image: pollo },
  { id: "carne", name: "Carne Vacuna", image: vaca },
  { id: "chorizos", name: "Chorizos", image: chori },
  { id: "combos", name: "Combos", image: combos },
];
export default function agruparProductos(products) {
  const agrupados = {};

  categories.forEach(({ id }) => {
    const productosCategoria = products.filter(
      (product) => product.category === id
    );

    if (productosCategoria.length) {
      agrupados[id] = productosCategoria;
    }
  });

  return agrupados;
}
export const precioOfertaPorKg=(product)=>{
  return  condicionOferta(product) ? product.offer.price / product.offer.kg : "";
}
export const precioNormalPorKg=(product)=>{
  return  product.price*product.quantity;
}
export const descuentoPorProducto = (product)=>{
  let descuento;
  if(condicionOferta(product)){
    descuento=product.price*product.quantity-(precioOfertaPorKg(product))*product.quantity;
  }
  
  return descuento
}
export const descuentoTotalProductos = (cart)=>{
  let descuento=0;
  cart.forEach(product => {
    if(condicionOferta(product)){
      descuento=descuento+descuentoPorProducto(product)
    }
  });

  return descuento
}
export const porcentajeDescuento = (product) =>{
 let porc = condicionOferta(product) ? "-" + Math.round(((product.price - precioOfertaPorKg(product)) / product.price) * 100) + "%" : "";

  return porc
}
export const precioTotalOfertaPorProducto=(product)=>{
  return condicionOferta(product) ? (precioOfertaPorKg(product)) * product.quantity : product.price * product.quantity;
}
export const condicionOferta=(product)=>{
  if(product.offer.kg!=null && product.quantity >= product.offer.kg){
    return true
  }else{
    return false
  }
}
export const totalPrecioProductos = (cart)=>{
  let total=0;
  cart.forEach(product => {
    if(condicionOferta(product)){
      total=total+precioTotalOfertaPorProducto(product)
    }else{
      total=total+precioNormalPorKg(product)
    }
  });
  return total
}

export const validarDatos = (cliente, datos, pay) => {
  
  if (!cliente.nombre.trim()) {
    alert("Ingrese su nombre y apellido.");
    return false;
  }

  if (!cliente.telefono.trim()) {
    alert("Ingrese su teléfono.");
    return false;
  }

  if (!datos.street?.trim()) {
    alert("Ingrese la calle.");
    return false;
  }

  if (!datos.number?.trim()) {
    alert("Ingrese la altura.");
    return false;
  }

  if (!datos.locality?.trim()) {
    alert("Ingrese la localidad.");
    return false;
  }

  if (!pay) {
    alert("Seleccione un método de pago.");
    return false;
  }
  return true;
};