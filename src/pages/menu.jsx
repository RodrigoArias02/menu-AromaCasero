import Header from "../components/header/header.jsx";
import Navbar from "../components/navbar/navbar.jsx";
import Categories from "../components/categories/categories.jsx";
import ProductCard from "../components/productCard/productCard.jsx";
import BottomCart from "../components/bottomCart/bottomCart.jsx";
import Modal from "../components/modal/modal.jsx";
import ContentModalCard from "../components/contentModalCard/contentModalCard.jsx";
import ContentModalCart from "../components/contentModalCart/contentModalCart.jsx"; // <-- crearás este componente
import ComprarModal from "../components/compraModal/compraModal.jsx";
import HorarioModal from "../components/horarioModal/horarioModal.jsx";
import Footer from "../components/footer/footer.jsx";
import "./menu.css";
import { useState } from "react";
import { categoryOrder, estaAbierto } from "../utils/products.js";
import agruparProductos from "../utils/products.js";
import { useCart } from "../hooks/useCart.jsx";
import { Toaster } from "sonner";
function Menu({ products }) {
  const { cart, totalCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);
  const [claseNone, setClaseNone] = useState("");
  const groupedProducts = agruparProductos(products);
  
  const [titleModal, setTitleModal] = useState("");
  const openProductModal = (product) => {
    setTitleModal("");
    setClaseNone("");
    setModalChildren(<ContentModalCard product={product} />);
    setIsModalOpen(true);
  };
  const openConfirmarPedidoModal = () => {
    setTitleModal("Confirmar Pedido");

    setModalChildren(
      <ComprarModal />, // El componente que querés que se abra ahora
    );
    // setIsModalOpen(true); // Ya está en true, pero te asegurás de que siga abierto
  };
  const openCartModal = () => {
    setClaseNone("none");
    setTitleModal("mi carrito");
    setModalChildren(
      // Le pasamos la función al carrito mediante una prop (ej: onSiguientePaso)
      <ContentModalCart onSiguientePaso={openConfirmarPedidoModal} />,
    );

    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalChildren(null);
  };
  const openScheduleModal = () => {
    setClaseNone("none");
    setTitleModal("Horarios y contacto");
    setClaseNone("clock");
    setModalChildren(<HorarioModal />);
    setIsModalOpen(true);
  };

  return (
    <div className="menu-container">
      {!estaAbierto() && (
  <div className="closed-banner">
    🔴 En este momento nos encontramos cerrados. Horario de atención: todos los días de 7:00 a 21:00.
  </div>
)}
      <Toaster position="top-center" richColors closeButton />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        clase={claseNone}
        header={
          <>
            <h2
              className={
                titleModal.includes("Confirmar Pedido") ? "text-center" : ""
              }
            >
              {titleModal}
            </h2>
            <button className="modal-close" onClick={closeModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </>
        }
      >
        {modalChildren}
      </Modal>

      <Header />

      <Navbar
        openCartModal={openCartModal}
        openScheduleModal={openScheduleModal}
      />

      <h1 className="title">Menú de Productos</h1>

      <Categories />

      <div className="products-grid">
        {Object.entries(groupedProducts).map(([category, products]) => (
          <div key={category} className="div-category-span" id={category}>
            <span className="text-category">
              <h2>{category}</h2>
              <p>{categoryOrder[category]}</p>
              <hr />
            </span>

            <div className="category-products">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  offer={product.offer}
                  stock={product.stock}
                  onClick={() => openProductModal(product)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomCart
        cantProducts={cart.length}
        total={totalCart}
        onClick={() => openCartModal(cart)}
      />
      <Footer />
    </div>
  );
}

export default Menu;
