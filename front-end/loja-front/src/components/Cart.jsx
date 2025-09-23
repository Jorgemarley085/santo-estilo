import React from "react";
import { useCart } from "../store/useCart";

export default function Cart() {
  const { items, removeItem, clearCart } = useCart();

  if (!items.length) return <p className="p-4">Seu carrinho está vazio.</p>;

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4">Carrinho</h2>
      {items.map((p) => (
        <div
          key={p.id}
          className="flex justify-between mb-2 border p-2 rounded"
        >
          <span>{p.name}</span>
          <button
            onClick={() => removeItem(p.id)}
            className="bg-red-50 border-black rounded-x1 px-4 py-2 shadow-[3px_3px_0px_black] text-black cursor-pointer active:bg-red-600 active:ring-4
               transition-colors duration-200"
          >
            Remover
          </button>
        </div>
      ))}
      <button
        onClick={clearCart}
        className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
      >
        Limpar Carrinho
      </button>
    </div>
  );
}
