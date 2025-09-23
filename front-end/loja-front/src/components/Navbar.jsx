import React from "react";
import { useAuth } from "../store/useAuth";
import cruz from "../../public/cruz2.png";

export default function Navbar({ goToView }) {
  const { token, role, nome, logout } = useAuth();

  return (
    <nav className="bg-orange-600 text-white flex justify-between items-center p-4">
      <div className="flex items-center space-x-4">
        <img src={cruz} alt="Logo" className="w-20 h-20 mr-3 bg-transparent" />

        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => goToView("products")}
        >
          Santo Estilo
        </h1>
        {token && <span className="ml-2">Olá, {nome}!</span>}
      </div>

      <div className="flex items-center space-x-4">
        {!token && (
          <>
            <button
              className="bg-white border-black rounded-x1 px-4 py-2 shadow-[3px_3px_0px_black] text-black  cursor-pointer active:bg-gray-600 active:ring-4
               transition-colors duration-200"
              onClick={() => goToView("login")}
            >
              Login
            </button>
            <button
              className="bg-white border-black rounded-x1 px-4 py-2 shadow-[3px_3px_0px_black] text-black  cursor-pointer active:bg-gray-600 active:ring-4
               transition-colors duration-200"
              onClick={() => goToView("register")}
            >
              Cadastrar
            </button>
          </>
        )}

        {token && (
          <>
            <button
              className="bg-red-50 border-black rounded-x1 px-4 py-2 shadow-[3px_3px_0px_black] text-black cursor-pointer active:bg-gray-600 active:ring-4
               transition-colors duration-200"
              onClick={() => goToView("cart")}
            >
              Carrinho
            </button>
            {role === "admin" && (
              <button
                className="bg-black px-3 py-1 rounded cursor-pointer"
                onClick={() => goToView("admin")}
              >
                Admin
              </button>
            )}
            <button
              className="bg-red-50 border-black rounded-x1 px-4 py-2 shadow-[3px_3px_0px_black] text-black cursor-pointer active:bg-red-600 active:ring-4
               transition-colors duration-200"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
