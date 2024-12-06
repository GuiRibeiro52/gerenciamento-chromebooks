// src/pages/Professores.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 

const Professores = () => {
  const [professores, setProfessores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "professores"));
        const professoresList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
       
        professoresList.sort((a, b) => a.nome.localeCompare(b.nome));
        setProfessores(professoresList);
      } catch (error) {
        setError("Erro ao carregar professores.");
      }
    };

    fetchProfessores();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "professores", id));
      setProfessores(professores.filter((professor) => professor.id !== id));
    } catch (error) {
      setError("Erro ao deletar o professor.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-poppins">
      <h2 className="text-3xl font-semibold text-center mb-6">Professores</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <Link to="/professores/novo">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4">
          Cadastrar Novo Professor
        </button>
      </Link>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-semibold">
              <th className="py-4 px-6">Nome</th>
              <th className="py-4 px-6">MASP</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Ações</th>
            </tr>
          </thead>
          <tbody>
            {professores.map((professor) => (
              <tr key={professor.id} className="border-t">
                <td className="py-4 px-6">{professor.nome}</td>
                <td className="py-4 px-6">{professor.masp}</td>
                <td className="py-4 px-6">{professor.email}</td>
                <td className="px-6 py-4 flex items-center gap-4">                  
                  <Link to={`/professores/editar/${professor.id}`}>
                    <button className="text-blue-500 hover:text-blue-600">
                      <FaEdit size={18} />
                    </button>
                  </Link>

                 
                  <button
                    onClick={() => handleDelete(professor.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Professores;
