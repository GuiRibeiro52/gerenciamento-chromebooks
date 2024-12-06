import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../firebaseConfig";
import { FaUsers, FaLaptop, FaArrowRight, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";

const Home = () => {
  const handleLogout = async () => {
    await logout();
    window.location.href = "/"; 
  };

  return (
    <div className="flex flex-col justify-center items-center py-8">
      <h1 className="text-3xl font-bold mb-10 mt-32">Bem-vindo ao sistema de Gerenciamento de Chromebooks</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
        <Link
          to="/professores"
          className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 "
        >
          <FaUsers size={40} className="text-blue-500 mb-3" />
          <span className="text-lg font-medium text-gray-700 hover:text-blue-600">
            Professores
          </span>
        </Link>

        <Link
          to="/chromebooks"
          className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 "
        >
          <FaLaptop size={40} className="text-green-500 mb-3" />
          <span className="text-lg font-medium text-gray-700 hover:text-green-600">
            Chromebooks
          </span>
        </Link>

        <Link
          to="/emprestar"
          className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 "
        >
          <FaArrowRight size={40} className="text-yellow-500 mb-3" />
          <span className="text-lg font-medium text-gray-700 hover:text-yellow-600">
            Emprestar
          </span>
        </Link>

        <Link
          to="/devolver"
          className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          <FaArrowLeft size={40} className="text-red-500 mb-3" />
          <span className="text-lg font-medium text-gray-700 hover:text-red-600">
            Devolver
          </span>
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-6 rounded-lg mt-6 hover:bg-red-600 transition duration-300"
      >
        <FaSignOutAlt size={18} className="inline mr-2" />
        Sair
      </button>
    </div>
  );
};

export default Home;
