import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/menu.jsx";
import Admin from "./pages/admin.jsx";
import { useEffect, useState } from "react";
import { getProducts } from "./service/db.js";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      const datos = await getProducts();
      setProducts(datos);
    };

    cargarProductos();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Menu products={products} />}
        />

        <Route
          path="/admin"
          element={<Admin products={products} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;