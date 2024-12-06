import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const ChromebookForm = () => {
  const [serie, setSerie] = useState("");
  const [patrimonio, setPatrimonio] = useState("");
  const [status, setStatus] = useState("Disponível");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); 

  
  useEffect(() => {
    if (id) {
      const fetchChromebook = async () => {
        const chromebookRef = doc(db, "chromebooks", id);
        const docSnap = await getDoc(chromebookRef);
        if (docSnap.exists()) {
          const chromebookData = docSnap.data();
          setSerie(chromebookData.serie);
          setPatrimonio(chromebookData.patrimonio);
          setStatus(chromebookData.status);
        } else {
          setError("Chromebook não encontrado.");
        }
      };
      fetchChromebook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        
        const chromebookRef = doc(db, "chromebooks", id);
        await updateDoc(chromebookRef, {
          serie,
          patrimonio,
          status,
        });
        navigate("/chromebooks");
      } else {
        
        await addDoc(collection(db, "chromebooks"), {
          serie,
          patrimonio,
          status,
        });
        navigate("/chromebooks");
      }
    } catch (error) {
      setError("Erro ao salvar dados. Tente novamente.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-32 font-poppins">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[400px] my-4">
        <h2 className="text-2xl text-center mb-4">
          {id ? "Editar Chromebook" : "Cadastrar Novo Chromebook"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Número de Série:</label>
            <input
              type="text"
              value={serie}
              onChange={(e) => setSerie(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o número de série"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Placa de Patrimônio:</label>
            <input
              type="text"
              value={patrimonio}
              onChange={(e) => setPatrimonio(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a placa de patrimônio"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Disponível">Disponível</option>
              <option value="Emprestado">Emprestado</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300"
          >
            {id ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChromebookForm;
