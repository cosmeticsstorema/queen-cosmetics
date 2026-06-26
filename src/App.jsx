import "./App.css";

const products = [];

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>👑 Queen Cosmetics</h1>

        <nav>
          <a href="#">Accueil</a>
          <a href="#">Produits</a>
          <a href="#">Panier 🛒</a>
        </nav>
      </header>

      <section className="hero">
        <h2>Révélez votre beauté naturelle ✨</h2>
        <p>
          Découvrez nos meilleurs produits de soin pour la peau et les cheveux.
        </p>
      </section>

      <section className="products">
        {products.length === 0 ? (
          <p>Aucun produit pour le moment.</p>
        ) : (
          products.map((product) => (
            <div className="card" key={product.id}>
              {product.image && (
                <img src={product.image} alt={product.name} />
              )}

              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <div className="price">
                <span>{product.price}</span>
              </div>

              <button>🛒 Ajouter au panier</button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;