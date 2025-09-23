import React, { useState } from "react";
import { useAuth } from "../store/useAuth";
import { toast } from "react-hot-toast";

export default function Register({ setView }) {
  const { setAuth } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setAuth(data.token, data.role, data.nome);

        toast.success("Cadastro realizado com sucesso!");
        setView("products");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao realizar cadastro.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-80"
      >
        <h2 className="text-xl font-bold mb-4">Cadastro</h2>

        <input
          className="border p-2 w-full mb-3"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Cadastrar
        </button>

        <p className="mt-2 text-sm">
          Já tem cadastro?{" "}
          <span
            className="text-blue-700 cursor-pointer"
            onClick={() => setView("login")}
          >
            Faça login
          </span>
        </p>
      </form>
    </div>
  );
}
