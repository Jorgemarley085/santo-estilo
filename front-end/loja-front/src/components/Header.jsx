import React from "react";
import { useAuth } from "../store/useAuth";

export default function Header({ setView }) {
  const { token, role, nome, clearAuth } = useAuth();

  const handleLogout = () => {
    clearAuth();
    setView("products"); // Redireciona para produtos ao sair
  };

  return (
    <header className="bg-orange-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Loja de Camisas</h1>

      {token ? (
        <div className="flex items-center space-x-4">
          {/* Saudação */}
          <span>Olá, {nome}</span>

          {/* Botão de admin */}
          {role === "admin" && (
            <button
              className="bg-blue-600 px-3 py-1 rounded"
              onClick={() => setView("admin")}
            >
              Painel Admin
            </button>
          )}

          {/* Logout */}
          <button
            className="bg-red-600 px-3 py-1 rounded"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      ) : (
        // Se não logado, mostrar botão de login
        <button
          className="bg-green-600 px-3 py-1 rounded"
          onClick={() => setView("login")}
        >
          Entrar / Cadastrar
        </button>
      )}
    </header>
  );
}
