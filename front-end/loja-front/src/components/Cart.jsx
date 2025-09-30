import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useCart } from "../store/useCart";

export default function Cart() {
  const { items, removeItem, clearCart, increaseQty, decreaseQty, getTotal } =
    useCart();
  const [payment, setPayment] = useState("pix");

  if (!items.length) return <p className="p-4">Seu carrinho está vazio.</p>;

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4">Carrinho</h2>

      {items.map((p) => (
        <div
          key={p.id}
          className="flex justify-between items-center mb-2 border p-2 rounded gap-4"
        >
          {p.image && (
            <img
              src={p.image}
              alt={p.name}
              className="w-16 h-16 object-cover rounded"
            />
          )}

          <div className="flex-1">
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-600">R$ {p.price.toFixed(2)}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQty(p.id)}
              className="px-2 py-1 border rounded"
            >
              -
            </button>
            <span>{p.quantity}</span>
            <button
              onClick={() => increaseQty(p.id)}
              className="px-2 py-1 border rounded"
            >
              +
            </button>

            <button
              onClick={() => removeItem(p.id)}
              className="bg-red-50 border-black rounded px-3 py-1 shadow-[3px_3px_0px_black] text-black cursor-pointer active:bg-red-600 active:ring-4 transition-colors duration-200"
            >
              Remover
            </button>
          </div>
        </div>
      ))}

      <h3 className="mt-4 font-bold text-lg">
        Total: R$ {getTotal().toFixed(2)}
      </h3>

      <div className="mt-4">
        <label className="block mb-2 font-semibold">Forma de Pagamento</label>
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="pix">Pix</option>
          <option value="cartao">Cartão de Crédito</option>
          <option value="boleto">Boleto Bancário</option>
        </select>
      </div>

      <button
        onClick={() => toast.success(`Compra finalizada via ${payment}`)}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full cursor-pointer"
      >
        Finalizar Compra
      </button>

      <button
        onClick={clearCart}
        className="mt-2 bg-gray-700 text-white px-4 py-2 rounded w-full cursor-pointer"
      >
        Limpar Carrinho
      </button>
    </div>
  );
}
