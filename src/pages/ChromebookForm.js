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
  const { id } = useParams();  // Para editar um Chromebook

  // Se for editar, buscar os dados do Chromebook
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
        // Atualizar Chromebook existente
        const chromebookRef = doc(db, "chromebooks", id);
        await updateDoc(chromebookRef, {
          serie,
          patrimonio,
          status,
        });
        navigate("/chromebooks");
      } else {
        // Adicionar novo Chromebook
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
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Editar Chromebook" : "Cadastrar Novo Chromebook"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Número de Série:</label>
          <input
            type="text"
            value={serie}
            onChange={(e) => setSerie(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Placa de Patrimônio:</label>
          <input
            type="text"
            value={patrimonio}
            onChange={(e) => setPatrimonio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Disponível">Disponível</option>
            <option value="Emprestado">Emprestado</option>
          </select>
        </div>
        <button type="submit">{id ? "Atualizar" : "Cadastrar"}</button>
      </form>
    </div>
  );
};

export default ChromebookForm;
