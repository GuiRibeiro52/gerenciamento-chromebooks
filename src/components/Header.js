import React from "react";
import useAuth from "../hooks/useAuth"; // Importando o hook customizado corretamente

const Header = () => {
  const user = useAuth(); // Obtém os dados do usuário logado através do hook useAuth

  return (
    <header className="header">
      <div className="logo">
        <span>Nome da Escola</span> {/* Aqui você pode substituir pelo logo */}
      </div>
      <div className="home-link">
        <a href="/home">Home</a>
      </div>
      <div className="user-info">
        {user ? (
          <span>Bem-vindo, {user.displayName || user.email}</span> // Exibe o nome ou email do usuário
        ) : (
          <span>Não logado</span> // Caso não haja um usuário logado
        )}
      </div>
    </header>
  );
};

export default Header;
