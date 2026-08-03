import * as turf from "@turf/turf";

// =======================
// ZONAS
// =======================

export const zonaGratis = [
  [-38.5442216, -58.785401],
  [-38.5881108, -58.7318891],
  [-38.5791626, -58.7011336],
  [-38.572909, -58.7161666],
  [-38.5639589, -58.7134082],
  [-38.5613707, -58.7234762],
  [-38.5546841, -58.7223728],
  [-38.548752, -58.730372],
  [-38.5335396, -58.7282823],
  [-38.5280395, -58.7380645],
  [-38.520227, -58.7340905],
  [-38.5114568, -58.7469296],
  [-38.5442216, -58.785401],
];

export const zonaIntermedia = [
  [-38.5445541, -58.784586],
  [-38.5858251, -58.7349617],
  [-38.6019128, -58.7810196],
  [-38.5688575, -58.8200464],
  [-38.5445541, -58.784586],
];

export const zonaQuequen = [
  [-38.5773337, -58.6995086],
  [-38.5665446, -58.6416734],
  [-38.5052951, -58.7328453],
  [-38.5128177, -58.7379621],
  [-38.5204607, -58.73207],
  [-38.5276178, -58.7367216],
  [-38.5333187, -58.7274184],
  [-38.5481146, -58.7297442],
  [-38.5551477, -58.7209061],
  [-38.5608464, -58.7207511],
  [-38.5632712, -58.7131534],
  [-38.5655747, -58.7117579],
  [-38.5706665, -58.7147039],
  [-38.5773337, -58.6995086],
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

  if (primero[0] !== ultimo[0] || primero[1] !== ultimo[1]) {
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
  listadoProductos,
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
