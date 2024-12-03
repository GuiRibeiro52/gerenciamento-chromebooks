import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import generateTermoEmprestimo from '../services/generateTermoEmprestimo'; 

const EmprestarChromebook = () => {
  const [chromebooks, setChromebooks] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [professor, setProfessor] = useState(null); // Professor selecionado
  const [selectedChromebook, setSelectedChromebook] = useState(null); 

  // Buscar Chromebooks disponíveis
  useEffect(() => {
    const fetchChromebooks = async () => {
      const chromebooksSnapshot = await getDocs(collection(db, 'chromebooks'));
      const chromebooksList = chromebooksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChromebooks(chromebooksList.filter(chromebook => chromebook.status === 'Disponível'));
    };
    fetchChromebooks();
  }, []);

  // Buscar Professores cadastrados
  useEffect(() => {
    const fetchProfessores = async () => {
      const professoresSnapshot = await getDocs(collection(db, 'professores'));
      const professoresList = professoresSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfessores(professoresList);
    };
    fetchProfessores();
  }, []);

  const handleEmprestimo = async () => {
    if (!selectedChromebook || !professor) {
      alert('Selecione um Chromebook e um professor.');
      return;
    }

    try {
      // Atualiza o status do Chromebook no Firestore para "Emprestado"
      const chromebookRef = doc(db, 'chromebooks', selectedChromebook.id);
      await updateDoc(chromebookRef, { status: 'Emprestado' });

      // Gerar o termo de empréstimo (PDF)
      generateTermoEmprestimo(professor, selectedChromebook);

      alert(`Chromebook ${selectedChromebook.serie} emprestado com sucesso!`);
    } catch (error) {
      console.error('Erro ao emprestar o Chromebook: ', error);
      alert('Erro ao realizar o empréstimo.');
    }
  };

  return (
    <div className="container">
      <h1>Emprestar Chromebook</h1>

      <div>
        <label>Selecione o Professor</label>
        <select onChange={(e) => setProfessor(JSON.parse(e.target.value))} value={professor ? JSON.stringify(professor) : ''}>
          <option value="">Selecione um Professor</option>
          {professores.map((prof) => (
            <option key={prof.id} value={JSON.stringify(prof)}>
              {prof.nome} - {prof.masp}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Selecione o Chromebook</label>
        <select onChange={(e) => setSelectedChromebook(JSON.parse(e.target.value))} value={selectedChromebook ? JSON.stringify(selectedChromebook) : ''}>
          <option value="">Selecione um Chromebook</option>
          {chromebooks.map((chromebook) => (
            <option key={chromebook.id} value={JSON.stringify(chromebook)}>
              {chromebook.serie} - {chromebook.patrimonio}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleEmprestimo}>Emprestar Chromebook</button>
    </div>
  );
};

export default EmprestarChromebook;
