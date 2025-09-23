import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useCart } from "../store/useCart";
import { useAuth } from "../store/useAuth";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addItem } = useCart();
  const { token } = useAuth();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  const handleAddToCart = (product) => {
    if (!token)
      return toast.error(
        "Faça login ou cadastre-se para adicionar ao carrinho!"
      );
    addItem(product);
    toast.success("Produto adicionado ao carrinho!");
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((p) => (
        <div key={p.id} className="border p-4 rounded shadow">
          <h3 className="font-bold">{p.name}</h3>
          <img
            src={p.imageUrl || "https://via.placeholder.com/150"}
            alt={p.name}
            className="w-24 h-24 object-cover"
          />

          <p>Preço: R$ {p.price}</p>
          <p>Tamanho: {p.size}</p>
          <button
            onClick={() => handleAddToCart(p)}
            className="bg-white border-black rounded-x1 px-4 py-2 shadow-[3px_3px_0px_black] text-black  cursor-pointer active:bg-gray-600 active:ring-4
               transition-colors duration-200"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      ))}
    </div>
  );
}
