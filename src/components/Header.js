import React from "react";
import useAuth from "../hooks/useAuth"; 

const Header = () => {
  const user = useAuth(); 

  return (
    <header className="header">
      <div className="logo">
        <span>Nome da Escola</span>
      </div>
      <div className="home-link">
        <a href="/home">Home</a>
      </div>
      <div className="user-info">
        {user ? (
          <span>Bem-vindo, {user.displayName || user.email}</span> 
        ) : (
          <span>Não logado</span> 
        )}
      </div>
    </header>
  );
};

export default Header;
