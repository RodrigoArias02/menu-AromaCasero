import { useState } from "react";

import HeaderAd from "./AdminComponents/headerAd.jsx";
import OptionsAd from "./AdminComponents/optionsAd.jsx";
import CardsAd from "./AdminComponents/cardsAd.jsx";


import "./AdminComponents/css/headerAd.css";
import "./admin.css";

function Admin({ products }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const [autenticado, setAutenticado] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

  const usuarioCorrecto =
    import.meta.env.VITE_ADMIN_USER;

  const passwordCorrecta =
    import.meta.env.VITE_ADMIN_PASSWORD;

    if (
      usuario === usuarioCorrecto &&
      password === passwordCorrecta
    ) {
      setAutenticado(true);
      setError("");
      return;
    }

    setError("Usuario o contraseña incorrectos");
  };

  if (!autenticado) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-modal">
          <h2>Acceso administrativo</h2>

          <p>Ingresá tus credenciales para continuar</p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <span className="admin-login-error">
                {error}
              </span>
            )}

            <button type="submit">
              INGRESAR
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="conteiner-admin">
      <HeaderAd />

      <main>
        <OptionsAd />

        <CardsAd products={products} />
      </main>
    </div>
  );
}

export default Admin;