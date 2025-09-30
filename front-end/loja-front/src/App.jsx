import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import { useAuth } from "./store/useAuth";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [view, setView] = useState("products");
  const { role } = useAuth();

  const renderView = () => {
    if (view === "login") return <Login setView={setView} />;
    if (view === "register") return <Register setView={setView} />;
    if (view === "cart") return <Cart />;
    if (view === "admin" && role === "admin") return <AdminDashboard />;
    return <Products />;
  };

  return (
    <>
      <Navbar goToView={setView} />
      {renderView()}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
