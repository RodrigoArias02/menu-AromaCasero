import { categories } from "../../utils/products";
import {FilterIcon} from "../../utils/icons.jsx"
import "./css/optionsAd.css";
function OptionsAd() {
  return (
    <div className="admin-container">
    
      <section className="admin-filters">
        <input
          id="search-product"
          type="search"
          placeholder="Buscar producto..."
        />
        <button type="button"><FilterIcon/>  Filtrar</button>
      </section>

      <nav className="admin-categories">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <a type="button" href={"#"+category.id}>{category.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default OptionsAd;
