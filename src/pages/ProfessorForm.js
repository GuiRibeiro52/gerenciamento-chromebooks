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
  const { id } = useParams();  // Para editar um professor, caso haja id na URL

  // Se for editar, buscar os dados do professor
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
        // Atualizar professor existente
        const professorRef = doc(db, "professores", id);
        await updateDoc(professorRef, { nome, email, masp });
        navigate("/professores");
      } else {
        // Adicionar novo professor
        await addDoc(collection(db, "professores"), { nome, email, masp });
        navigate("/professores");
      }
    } catch (error) {
      setError("Erro ao salvar dados. Tente novamente.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Editar Professor" : "Cadastrar Novo Professor"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>MASP:</label>
          <input
            type="text"
            value={masp}
            onChange={(e) => setMasp(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id ? "Atualizar" : "Cadastrar"}</button>
      </form>
    </div>
  );
};

export default ProfessorForm;
