import { useState, useEffect } from "react";

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
    alert(product.name + " ajouté au panier !");
  };

  const supprimerDuPanier = (index) => {
    const nouveauPanier = [...cart];
    nouveauPanier.splice(index, 1);
    setCart(nouveauPanier);
  };

  const total = cart.reduce(
  (sum, product) =>
    sum + parseInt(product.price.replace("DH", "")),
  0
);

  const commanderWhatsApp = () => {
    let message =
      "👑 Bonjour, je souhaite commander :\n\n";

    cart.forEach((product, index) => {
      message += `${index + 1}. ${
        product.name
      } - ${product.price} DH\n`;
    });

    message += `\n💰 Total : ${total} DH`;

    const numero = "212710871873";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8f8f8",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#222",
          marginBottom: "10px",
        }}
      >
        👑 Queen Cosmetics
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "20px",
          marginBottom: "40px",
        }}
      >
        🛒 Produits dans le panier : {cart.length}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              background: "white",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3>{product.name}</h3>

              <p>
                <strong>
                  {product.price} DH
                </strong>
              </p>

              <p>{product.description}</p>

              <button
                onClick={() =>
                  ajouterAuPanier(product)
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#000",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Ajouter au panier 🛒
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ margin: "50px 0" }} />

      <h2 style={{ textAlign: "center" }}>
        🛒 Votre panier
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
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                margin: "15px auto",
                maxWidth: "500px",
                display: "flex",
                gap: "15px",
                alignItems: "center",
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
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  background: "red",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ❌
              </button>
            </div>
          ))}

          <h3 style={{ textAlign: "center" }}>
            💰 Total : {total} DH
          </h3>

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <button
              onClick={commanderWhatsApp}
              style={{
                padding: "15px 25px",
                border: "none",
                borderRadius: "10px",
                background: "#25D366",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Commander sur WhatsApp 📱
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Shop;