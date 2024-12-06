import React from "react";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const user = useAuth();

  return (
    <header className="bg-gray-100 text-gray-800 opacity p-4 shadow-md">      
      <div className="container mx-auto flex justify-between items-center text-xl">
        
        <div className="font-bold">
          <span>E.E. Iarbas Rodrigues</span>
        </div>        
        <div>
          <a
            href="/home"
            className="hover:text-blue-900 transition duration-300 text-base font-semibold"
          >
            Home
          </a>
        </div>
        <div>
          <a
            href="/professores"
            className="hover:text-blue-900 transition duration-300 text-base font-semibold"
          >
            Professores
          </a>
        </div>
        <div>
          <a
            href="/chromebooks"
            className="hover:text-blue-900 transition duration-300 text-base font-semibold"
          >
            Chromebooks
          </a>
        </div>
        <div>
          <a
            href="/emprestar"
            className="hover:text-blue-900 transition duration-300 text-base font-semibold"
          >
            Emprestar
          </a>
        </div>
        <div>
          <a
            href="/devolver"
            className="hover:text-blue-900 transition duration-300 text-base font-semibold"
          >
            Devolver
          </a>
        </div>

        
        <div className="font-bold">
          {user ? (
            <span >
              Bem-vindo, {user.displayName || user.email}.
            </span>
          ) : (
            <span>Não logado</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
