import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrashAlt } from "react-icons/fa";  

const Chromebooks = () => {
  const [chromebooks, setChromebooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChromebooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chromebooks"));
        const chromebooksList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setChromebooks(chromebooksList);
      } catch (error) {
        setError("Erro ao carregar Chromebooks.");
      }
    };

    fetchChromebooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "chromebooks", id));
      setChromebooks(chromebooks.filter(chromebook => chromebook.id !== id));
    } catch (error) {
      setError("Erro ao deletar o Chromebook.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-poppins">
      <h2 className="text-3xl font-semibold mb-6 text-center">Chromebooks</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <Link to="/chromebooks/novo">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4">Cadastrar Novo Chromebook</button>
      </Link>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-semibold">
              <th className="px-6 py-4">Nº Patrimônio</th>
              <th className="px-6 py-4">Serial</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {chromebooks.sort((a, b) => a.patrimonio.localeCompare(b.patrimonio)).map(chromebook => (
              <tr key={chromebook.id} className="border-t">
                <td className="px-6 py-4">{chromebook.patrimonio}</td>
                <td className="px-6 py-4">{chromebook.serie}</td>
                <td className={`px-6 py-4 font-semibold ${chromebook.status === "disponível" ? "text-green-500" : "text-red-500"}`}>
                  {chromebook.status}
                </td>
                <td className="px-6 py-4 flex items-center gap-4">
                  <Link to={`/chromebooks/editar/${chromebook.id}`} className="text-blue-500 hover:text-blue-600">
                    <FaEdit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(chromebook.id)}
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

export default Chromebooks;
