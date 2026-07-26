import "./divInput.css"
import { ShopIcon,PhoneIcon,PencilIcon } from "../../../utils/icons.jsx";
function DivInput({nombre, telefono, setCliente}) {
  const handleChange = (e) => {
    setCliente((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
    <h3>
        <span><ShopIcon/></span>Datos de entrega
      </h3>
      <div className="div-input">
        <label>Nombre y apellido</label>
        <div className="input">
          <span>
            <PencilIcon />
          </span>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleChange}
            placeholder="Ej: Juan Perez"
          />
        </div>
      </div>
      <div className="div-input">
        <label>Telefono</label>
        <div className="input">
          <span>
            <PhoneIcon />
          </span>
          <input
            type="text"
            name="telefono"
            value={telefono}
            onChange={handleChange}
            placeholder="Ej: 2262 123456"
          />
        </div>
      </div>
    </>
  );
}

export default DivInput;
