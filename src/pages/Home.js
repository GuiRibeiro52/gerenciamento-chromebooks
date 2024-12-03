import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../firebaseConfig";

const Home = () => {
  const handleLogout = async () => {
    await logout();
    window.location.href = "/"; 
  };

  return (
    <div>
      <h1>Bem-vindo à Home!</h1>
      <nav>
        <ul>
          <li><Link to="/professores">Professores</Link></li>
          <li><Link to="/chromebooks">Chromebooks</Link></li>
          <li><Link to="/emprestar">Emprestar Chromebook</Link></li>
          <li><Link to="/devolver">Devolver Chromebook</Link></li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default Home;
