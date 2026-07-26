import * as turf from "@turf/turf";

// =======================
// ZONAS
// =======================

export const zonaGratis = [
  [-38.5261924, -58.7423653],
  [-38.5508863, -58.7748658],
  [-38.5730995, -58.7467019],
  [-38.5555665, -58.72505],
  [-38.5353246, -58.7297513],
];

export const zonaIntermedia = [
  [-38.5555743, -58.7251306],
  [-38.5753080, -58.7495379],
  [-38.5887212, -58.7408230],
  [-38.5812273, -58.7027130],
  [-38.5758678, -58.7132484],
  [-38.5680396, -58.7158870],
  [-38.5651928, -58.7130595],
  [-38.5617402, -58.7210384],
  [-38.5558838, -58.7204100],
];

export const zonaQuequen = [
  [-38.5770222, -58.6968444],
  [-38.5693746, -58.6544724],
  [-38.5496506, -58.6788111],
  [-38.5304404, -58.7030392],
  [-38.5416037, -58.7280417],
  [-38.5538035, -58.7212932],
  [-38.5613299, -58.71897],
  [-38.5648766, -58.7114471],
  [-38.5704991, -58.7137704],
  [-38.5760346, -58.7051412],
];

// =======================
// FUNCIONES
// =======================

function crearPolygon(coords) {
  // Turf usa [lng, lat]
  const puntos = coords.map(([lat, lng]) => [lng, lat]);

  // Cerrar automáticamente el polígono si hace falta
  const primero = puntos[0];
  const ultimo = puntos[puntos.length - 1];

  if (
    primero[0] !== ultimo[0] ||
    primero[1] !== ultimo[1]
  ) {
    puntos.push([...primero]);
  }

  return turf.polygon([puntos]);
}

// =======================
// ZONAS CONFIGURADAS
// =======================

const zonas = [
  {
    nombre: "Gratis",
    costo: 0,
    polygon: crearPolygon(zonaGratis),
  },
  {
    nombre: "Intermedia",
    costo: 4000,
    polygon: crearPolygon(zonaIntermedia),
  },
  {
    nombre: "Quequén",
    costo: 5000,
    polygon: crearPolygon(zonaQuequen),
  },
];

// =======================
// CALCULAR ENVÍO
// =======================

export function calcularEnvio(lat, lng) {
  const punto = turf.point([lng, lat]);

  for (const zona of zonas) {
    if (turf.booleanPointInPolygon(punto, zona.polygon)) {
      return zona;
    }
  }

  return {
    nombre: "Fuera de cobertura",
    costo: 0,
  };
}

// src/utils/messageBuilder.js

export const generarMensajePedido = (
  cliente,
  datos,
  pay,
  hour,
  totalCart,
  listadoProductos
) => {
  return `*🧾 NUEVO PEDIDO*

━━━━━━━━━━━━━━━━━━
*DATOS DEL CLIENTE*
━━━━━━━━━━━━━━━━━━

👤 ${cliente.nombre}
📞 ${cliente.telefono}

📍 ${datos.street} ${datos.number}
🏙️ ${datos.locality}

━━━━━━━━━━━━━━━━━━
*PRODUCTOS*
━━━━━━━━━━━━━━━━━━

${listadoProductos}

━━━━━━━━━━━━━━━━━━
💳 *PAGO:* ${pay}
🕒 *HORARIO:* ${hour}

━━━━━━━━━━━━━━━━━━
💰 *TOTAL: $${totalCart}*
━━━━━━━━━━━━━━━━━━`;
};