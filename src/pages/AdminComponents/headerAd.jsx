import "./css/headerAd.css"
function HeaderAd() {
  return (
    <header className="header-admin">
        <h2>ADMINISTRACIÓN</h2>
        <p>Precio y stock</p>
        <nav>
            <ul>
                <li><button className="activeAd">Productos</button></li>
                <li><button>Resumen</button></li>
            </ul>
        </nav>
    </header>
  );
}

export default HeaderAd;