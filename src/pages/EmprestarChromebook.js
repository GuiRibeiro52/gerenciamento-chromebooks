import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { FaLaptop, FaUser, FaCheckCircle } from 'react-icons/fa'; 
import generateTermoEmprestimo from '../services/generateTermoEmprestimo';

const EmprestarChromebook = () => {
  const [chromebooks, setChromebooks] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [professor, setProfessor] = useState(null); 
  const [selectedChromebook, setSelectedChromebook] = useState(null); 

  
  const fetchChromebooks = async () => {
    const chromebooksSnapshot = await getDocs(collection(db, 'chromebooks'));
    const chromebooksList = chromebooksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setChromebooks(chromebooksList.filter(chromebook => chromebook.status === 'Disponível'));
  };

  
  useEffect(() => {
    fetchChromebooks();
  }, []);

  
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

 
  const handleEmprestimo = async (e) => {
    e.preventDefault();
    if (!selectedChromebook || !professor) {
      alert('Selecione um Chromebook e um professor.');
      return;
    }

    try {
    
      const chromebookRef = doc(db, 'chromebooks', selectedChromebook.id);
      
    
      await updateDoc(chromebookRef, {
        status: 'Emprestado',
        professorNome: professor.nome,
        professorId: professor.id,
      });

    
      generateTermoEmprestimo(professor, selectedChromebook);

      alert(`Chromebook ${selectedChromebook.serie} emprestado com sucesso!`);
      fetchChromebooks(); 

      
      setProfessor(null);
      setSelectedChromebook(null);
    } catch (error) {
      console.error('Erro ao emprestar o Chromebook: ', error);
      alert('Erro ao realizar o empréstimo.');
    }
  };

  return (
    <div className="flex justify-center items-center mt-32 py-8 font-poppins">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[500px]">
        <h2 className="text-2xl text-center mb-4">Emprestar Chromebook</h2>

        <form onSubmit={handleEmprestimo} className="space-y-6">
          
          <div className="flex flex-col">
            <label className="font-semibold mb-2 flex items-center">
              <FaUser size={20} className="mr-2" />
              Selecione o Professor
            </label>
            <select
              onChange={(e) => setProfessor(JSON.parse(e.target.value))}
              value={professor ? JSON.stringify(professor) : ''}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione um Professor</option>
              {professores.map((prof) => (
                <option key={prof.id} value={JSON.stringify(prof)}>
                  {prof.nome} - {prof.masp}
                </option>
              ))}
            </select>
          </div>

        
          <div className="flex flex-col">
            <label className="font-semibold mb-2 flex items-center">
              <FaLaptop size={20} className="mr-2" />
              Selecione o Chromebook
            </label>
            <select
              onChange={(e) => setSelectedChromebook(JSON.parse(e.target.value))}
              value={selectedChromebook ? JSON.stringify(selectedChromebook) : ''}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione um Chromebook</option>
              {chromebooks.map((chromebook) => (
                <option key={chromebook.id} value={JSON.stringify(chromebook)}>
                  {chromebook.serie} - {chromebook.patrimonio}
                </option>
              ))}
            </select>
          </div>

         
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-lg w-full hover:bg-blue-600 transition duration-300"
          >
            <FaCheckCircle size={20} className="inline mr-2" />
            Emprestar Chromebook
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmprestarChromebook;
