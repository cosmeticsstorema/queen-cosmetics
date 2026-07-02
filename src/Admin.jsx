import { useState, useEffect } from "react";
import "./Admin.css";

function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const ajouterProduit = () => {
    if (!name || !price || !description || !image) {
      alert("Remplissez tous les champs !");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const nouveauProduit = {
        name,
        price,
        description,
        image: reader.result,
      };

      setProducts([...products, nouveauProduit]);

      setName("");
      setPrice("");
      setDescription("");
      setImage(null);

      alert("Produit ajouté !");
    };

    reader.readAsDataURL(image);
  };

  const supprimerProduit = (index) => {
    const nouveauxProduits = products.filter(
      (_, i) => i !== index
    );
    setProducts(nouveauxProduits);
  };

  return (
    <div className="admin">
      <h1>👑 Admin Queen Cosmetics</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Nom du produit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={ajouterProduit}>
          Ajouter
        </button>
      </div>

      <div className="products">
        {products.map((product, index) => (
          <div className="card" key={index}>
            <img
              src={product.image}
              alt={product.name}
            />

            <div className="card-content">
              <h3>{product.name}</h3>
              <p>{product.price} DH</p>
              <p>{product.description}</p>

              <button
                className="delete-btn"
                onClick={() => supprimerProduit(index)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;