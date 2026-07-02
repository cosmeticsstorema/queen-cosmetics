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
    let message =
      "👑 Bonjour, je souhaite commander :\n\n";

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
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          👑 Queen Cosmetics
        </