import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const ProfessorForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [masp, setMasp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();  

  
  useEffect(() => {
    if (id) {
      const fetchProfessor = async () => {
        const professorRef = doc(db, "professores", id);
        const docSnap = await getDoc(professorRef);
        if (docSnap.exists()) {
          const professorData = docSnap.data();
          setNome(professorData.nome);
          setEmail(professorData.email);
          setMasp(professorData.masp);
        } else {
          setError("Professor não encontrado.");
        }
      };
      fetchProfessor();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        
        const professorRef = doc(db, "professores", id);
        await updateDoc(professorRef, { nome, email, masp });
        navigate("/professores");
      } else {
       
        await addDoc(collection(db, "professores"), { nome, email, masp });
        navigate("/professores");
      }
    } catch (error) {
      setError("Erro ao salvar dados. Tente novamente.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-32 font-poppins">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[400px] my-4">
        <h2 className="font-poppins text-2xl text-center mb-4">
          {id ? "Editar Professor" : "Cadastrar Novo Professor"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="flex flex-col">
            <label className="font-semibold">MASP:</label>
            <input
              type="text"
              value={masp}
              onChange={(e) => setMasp(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o MASP"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">E-mail:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o e-mail"
            />
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

export default ProfessorForm;
