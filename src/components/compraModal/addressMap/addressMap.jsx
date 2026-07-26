import { useState, useEffect } from "react";
import { MapIcon, UbicationIcon, LocationIcon } from "../../../utils/icons.jsx";
import MapComponent from "../mapComponent.jsx";
import "./addressMap.css";

// 1. Agregamos 'locality' y 'setLocality' a las props
function AddressMap({setDatos} ) {
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [locality, setLocality] = useState("");
  const [error, setError] = useState("");
  const [latitude, setLatitude] = useState(-38.5550); // Default Necochea
  const [longitude, setLongitude] = useState(-58.7400);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setDatos({
      street,
      number,
      locality,
      latitude,
      longitude,
    });
  }, [street, number, locality, latitude, longitude, setDatos]);

  // Función para buscar dirección con Photon
  const handleSearch = async () => {
    setError("");

    if (!street.trim() || !number.trim()) {
      setError("Por favor, completa la calle y la altura.");
      return;
    }

    setIsSearching(true);

    try {
      const streetClean = street.trim();
      const hasCalle = streetClean.toLowerCase().includes("calle");
      const formattedStreet = hasCalle ? streetClean : `Calle ${streetClean}`;

      const fullAddress = `${formattedStreet} ${number.trim()}, Necochea`;
      const bbox = "-58.8100,-38.6000,-58.6400,-38.5100";

      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(fullAddress)}&bbox=${bbox}`,
      );

      if (!res.ok) throw new Error("Error en la búsqueda");

      const data = await res.json();

      if (data.features && data.features.length > 0) {
        const bestResult = data.features[0];
        const [lon, lat] = bestResult.geometry.coordinates;

        // 2. Extraemos la localidad desde las propiedades de Photon
        // Photon suele devolver la localidad en 'district', 'suburb' o 'city'
        const properties = bestResult.properties;
        const detectedLocality = properties.district || properties.suburb || properties.city || "Necochea";

        // Actualizamos las coordenadas del mapa
        setLatitude(lat);
        setLongitude(lon);
        
        // 3. Guardamos la localidad en el estado del padre
        setLocality(detectedLocality); 
        setError("");
      } else {
        setError("No se encontró la ubicación exacta en Necochea/Quequén.");
      }
    } catch (err) {
      console.error("Hubo un problema:", err);
      setError("Error al conectar con el servidor de mapas.");
    } finally {
      setIsSearching(false);
    }
  };

  // Manejador de cambio de posición del marcador
  const handleMarkerDragEnd = (newLat, newLon) => {
  setLatitude(newLat);
  setLongitude(newLon);
};

  return (
    <section className="section-address-map">
      <div className="div-address">
        <h3>
          <span>
            <UbicationIcon />
          </span>
          Dirección de entrega
        </h3>

        <div className="address-search">
          <section className="address-section-inputs">
            <div className="div-input">
              <label>Calle</label>
              <div className="input">
                <input
                  type="text"
                  placeholder="Ej: Calle 74"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
            </div>
            <div className="div-input">
              <label>Altura</label>
              <div className="input">
                <input
                  type="text"
                  placeholder="Ej: 1234"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </div>
          </section>

          <div className="address-buttons-group">
            <button
              type="button"
              onClick={handleSearch}
              disabled={!street.trim() || !number.trim() || isSearching}
              className="btn-search"

            >
              <span>
                <LocationIcon />
              </span>
              {isSearching ? "Buscando..." : "Cargar posicion en el mapa"}
            </button>

          </div>
        </div>

        {/* Muestra mensajes de error si la validación falla */}
        {error && (
          <p
            className="error-message"
            style={{ color: "red", fontSize: "14px" }}
          >
            {error}
          </p>
        )}
      </div>

      <div className="div-map">
        <h3>
          <span>
            <MapIcon />
          </span>
          Ubicación en el mapa
        </h3>

        {/* Componente de mapa interactivo con Leaflet */}
        <MapComponent
       
          latitude={latitude}
          longitude={longitude}
          onMarkerDragEnd={handleMarkerDragEnd}
        />
      </div>
    </section>
  );
}

export default AddressMap;
