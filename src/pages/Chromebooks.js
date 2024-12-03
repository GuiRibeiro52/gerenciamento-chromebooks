// src/pages/Chromebooks.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

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
    <div>
      <h2>Chromebooks</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link to="/chromebooks/novo">
        <button>Cadastrar Novo Chromebook</button>
      </Link>
      <ul>
        {chromebooks.map(chromebook => (
          <li key={chromebook.id}>
            {chromebook.serie} - {chromebook.patrimonio} ({chromebook.status})
            <button onClick={() => handleDelete(chromebook.id)}>Deletar</button>
            <Link to={`/chromebooks/editar/${chromebook.id}`}>
              <button>Editar</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chromebooks;
