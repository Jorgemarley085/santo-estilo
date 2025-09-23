import React, { useEffect, useState } from "react";
import { useAuth } from "../store/useAuth";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    size: "",
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/api/products/${editingId}`
      : "http://localhost:5000/api/products";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        price: parseFloat(form.price),
        size: form.size,
        imageUrl: form.imageUrl,
      }),
    });

    setForm({ name: "", price: "", size: "", imageUrl: "" });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price, size: product.size });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4">Painel Admin</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          className="border p-2 w-full mb-3"
          type="text"
          placeholder="URL da imagem"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} // atualizar form
        />

        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Tamanho"
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          {editingId ? "Atualizar" : "Adicionar"}
        </button>
      </form>

      {products.map((p) => (
        <div
          key={p.id}
          className="flex justify-between mb-2 border p-2 rounded"
        >
          <span>
            {p.name} - ${p.price} - {p.size}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(p)}
              className="bg-yellow-500 text-white px-2 rounded"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500 text-white px-2 rounded"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
