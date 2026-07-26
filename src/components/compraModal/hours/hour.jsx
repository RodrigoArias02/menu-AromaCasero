import "./hour.css";
import { ClockIcon } from "../../../utils/icons.jsx";

function Hours({ hour, setHour }) {
  const hours = ["12hs", "13hs", "14hs", "19hs", "20hs", "21hs"];

  const horaActual = new Date().getHours();

  const estaDisponible = (h) => {
    const hora = parseInt(h); // "19hs" -> 19
    return hora > horaActual;
  };

  return (
    <div className="div-hour">
      <h3>
        <span><ClockIcon /></span> Horario de envío
      </h3>

      <div className="hours">
        {hours.map((h) => {
          const disponible = estaDisponible(h);

          return (
            <button
              key={h}
              type="button"
              disabled={!disponible}
              className={`${hour === h ? "hour active" : "hour"} ${
                !disponible ? "disabled" : ""
              }`}
              onClick={() => setHour(h)}
            >
              {h}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Hours;