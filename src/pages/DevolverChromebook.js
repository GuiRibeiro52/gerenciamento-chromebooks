import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import Modal from 'react-modal';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import generateTermoDevolucao from '../services/generateTermoDevolucao';

const DevolverChromebook = () => {
  const [chromebooks, setChromebooks] = useState([]);
  const [selectedChromebook, setSelectedChromebook] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const fetchChromebooks = async () => {
    const chromebooksSnapshot = await getDocs(collection(db, 'chromebooks'));
    const chromebooksList = chromebooksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setChromebooks(chromebooksList.filter((chromebook) => chromebook.status === 'Emprestado'));
  };

  useEffect(() => {
    fetchChromebooks();
  }, []);

  const handleDevolucao = async () => {
    if (!selectedChromebook) {
      alert('Selecione um Chromebook.');
      return;
    }

    try {
      const chromebookRef = doc(db, 'chromebooks', selectedChromebook.id);
      await updateDoc(chromebookRef, { status: 'Disponível' });

      generateTermoDevolucao(selectedChromebook);

      alert(`Chromebook ${selectedChromebook.serie} devolvido com sucesso!`);
      setModalIsOpen(false);
      setSelectedChromebook(null);

      setTimeout(() => fetchChromebooks(), );
    } catch (error) {
      console.error('Erro ao devolver o Chromebook: ', error);
      alert('Erro ao realizar a devolução.');
    }
  };

  const openModal = () => {
    if (!selectedChromebook) {
      alert('Por favor, selecione um Chromebook.');
      return;
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center py-8 font-poppins">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[800px]">
        <h1 className="text-2xl font-semibold text-center mb-6">Devolver Chromebook</h1>
        <p className='text-sm italic mb-4'>Atenção: É necessário selecionar o servidor para efetuar a devolução.</p>
        
        <div className="overflow-x-auto bg-white rounded-lg  mb-8">
          {chromebooks.length === 0 ? (
            <p className="text-center text-lg text-gray-500">Não há Chromebooks emprestados.</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left text-sm font-semibold">
                  <th className="py-4 px-6">Número de Série</th>
                  <th className="py-4 px-6">Número de Patrimônio</th>
                  <th className="py-4 px-6">Nome do Professor</th>
                  <th className="py-4 px-6">Ação</th>
                </tr>
              </thead>
              <tbody>
                {chromebooks.map((chromebook) => (
                  <tr
                    key={chromebook.id}
                    className={`border-t cursor-pointer ${
                      selectedChromebook?.id === chromebook.id ? 'bg-green-300' : ''
                    }`}
                    onClick={() => setSelectedChromebook(chromebook)}
                  >
                    <td className="py-4 px-6">{chromebook.serie}</td>
                    <td className="py-4 px-6">{chromebook.patrimonio}</td>
                    <td className="py-4 px-6">{chromebook.professorNome || 'Nome do Professor'}</td>
                    <td className="px-6 py-4 flex items-center gap-4">
                      <button
                        onClick={openModal}
                        disabled={!selectedChromebook || selectedChromebook.id !== chromebook.id}
                        className={`${
                          !selectedChromebook || selectedChromebook.id !== chromebook.id
                            ? 'bg-gray-300 cursor-not-allowed' // Botão desabilitado
                            : 'bg-blue-500 cursor-pointer hover:bg-blue-600'
                        } text-white px-4 py-2 rounded-lg transition duration-300`}
                      >
                        Devolver
                      </button>
                    </td>                  
                  </tr>
                ))}              
              </tbody>
            </table>
          )}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px] mx-auto"
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
        >
          <h2 className="text-lg font-semibold mb-4">Confirmar Devolução</h2>
          <p className="mb-4">
            Você tem certeza que deseja devolver o Chromebook <strong>Nº: {selectedChromebook?.serie}</strong>?
          </p>
          <div className="flex justify-between gap-4">
            <button
              onClick={handleDevolucao}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300 w-full flex items-center justify-center"
            >
              <FaCheckCircle className="mr-2" />
              Sim
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 w-full flex items-center justify-center"
            >
              <FaTimesCircle className="mr-2" />
              Não
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DevolverChromebook;
