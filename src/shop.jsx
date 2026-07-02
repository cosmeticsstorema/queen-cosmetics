import { useState, useEffect } from "react";
import "./App.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const ajouterAuPanier = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const supprimerDuPanier = (index) => {
    const nouveauPanier = [...cart];
    nouveauPanier.splice(index, 1);
    setCart(nouveauPanier);
  };

  const total = cart.reduce(
    (sum, product) =>
      sum + parseInt(String(product.price).replace("DH", "")),
    0
  );

  const commanderWhatsApp = () => {
    let message = "👑 Bonjour, je souhaite commander :\n\n";

    cart.forEach((product, index) => {
      message += `${index + 1}. ${product.name} - ${product.price} DH\n`;
    });

    message += `\n💰 Total : ${total} DH`;

    const numero = "212710871873";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="banner">
        <h1>👑 Queen Cosmetics</h1>
        <p>La beauté commence ici ✨</p>
      </div>

      <div className="products">
        {products.map((product, index) => (
          <div key={index} className="card">
            <img
              src={product.image}
              alt={product.name}
            />

            <div className="card-content">
              <h3>{product.name}</h3>

              <p className="price">
                {product.price} DH
              </p>

              <p>{product.description}</p>

              <button
                className="btn"
                onClick={() =>
                  ajouterAuPanier(product)
                }
              >
                Ajouter au panier 🛒
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="panier">
        <h2>
          🛒 Votre panier ({cart.length})
        </h2>

        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            Votre panier est vide.
          </p>
        ) : (
          <>
            {cart.map((product, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3>{product.name}</h3>
                  <p>{product.price} DH</p>
                </div>

                <button
                  onClick={() =>
                    supprimerDuPanier(index)
                  }
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </div>
            ))}

            <h3 className="total">
              💰 Total : {total} DH
            </h3>

            <div
              style={{
                textAlign: "center",
                marginTop: "25px",
              }}
            >
              <button
                className="btn"
                onClick={commanderWhatsApp}
              >
                Commander sur WhatsApp 📱
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Shop;