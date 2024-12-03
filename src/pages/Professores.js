// src/pages/Professores.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Professores = () => {
  const [professores, setProfessores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "professores"));
        const professoresList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
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
      setProfessores(professores.filter(professor => professor.id !== id));
    } catch (error) {
      setError("Erro ao deletar o professor.");
    }
  };

  return (
    <div>
      <h2>Professores</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link to="/professores/novo">
        <button>Cadastrar Novo Professor</button>
      </Link>
      <ul>
        {professores.map(professor => (
          <li key={professor.id}>
            {professor.masp} - {professor.nome} ({professor.email}) 
            <button onClick={() => handleDelete(professor.id)}>Deletar</button>
            <Link to={`/professores/editar/${professor.id}`}>
              <button>Editar</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Professores;
