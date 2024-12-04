import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import Modal from 'react-modal';

const DevolverChromebook = () => {
  const [chromebooks, setChromebooks] = useState([]);
  const [selectedChromebook, setSelectedChromebook] = useState(null); 
  const [modalIsOpen, setModalIsOpen] = useState(false); // Controla a visibilidade do modal

  // Buscar Chromebooks emprestados ao carregar a página
  useEffect(() => {
    const fetchChromebooks = async () => {
      const chromebooksSnapshot = await getDocs(collection(db, 'chromebooks'));
      const chromebooksList = chromebooksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Filtra apenas os Chromebooks com status "Emprestado"
      setChromebooks(chromebooksList.filter((chromebook) => chromebook.status === 'Emprestado'));
    };
    fetchChromebooks();
  }, []);

  // Lidar com a devolução do Chromebook
  const handleDevolucao = async () => {
    if (!selectedChromebook) {
      alert('Selecione um Chromebook.');
      return;
    }

    try {
      // Atualiza o status do Chromebook no Firestore para "Disponível"
      const chromebookRef = doc(db, 'chromebooks', selectedChromebook.id);
      await updateDoc(chromebookRef, { status: 'Disponível' });

      alert(`Chromebook ${selectedChromebook.serie} devolvido com sucesso!`);
      setModalIsOpen(false); // Fecha o modal após a devolução
      setSelectedChromebook(null); // Reseta o Chromebook selecionado
    } catch (error) {
      console.error('Erro ao devolver o Chromebook: ', error);
      alert('Erro ao realizar a devolução.');
    }
  };

  // Abrir o modal de confirmação
  const openModal = () => {
    if (!selectedChromebook) {
      alert('Por favor, selecione um Chromebook.');
      return;
    }
    setModalIsOpen(true); // Abre o modal
  };

  // Fechar o modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <h1>Devolver Chromebook</h1>

      <div style={{ marginTop: '20px' }}>
        <h2>Chromebooks Emprestados</h2>
        <table>
          <thead>
            <tr>
              <th>Número de Série</th>
              <th>Número de Patrimônio</th>
              <th>Nome do Professor</th>
              <th>Devolver</th>
            </tr>
          </thead>
          <tbody>
            {chromebooks.map((chromebook) => (
              <tr
                key={chromebook.id}
                style={{
                  backgroundColor:
                    selectedChromebook?.id === chromebook.id ? '#c8e6c9' : '',
                }}
                onClick={() => setSelectedChromebook(chromebook)}
              >
                <td>{chromebook.serie}</td>
                <td>{chromebook.patrimonio}</td>
                <td>{chromebook.professorNome || 'Nome do Professor'}</td> {/* Exibe o nome armazenado */}
                <td>
                  <button
                    onClick={() => openModal()} // Abre o modal para confirmação
                    disabled={!selectedChromebook || selectedChromebook.id !== chromebook.id}
                  >
                    Realizar Devolução
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Confirmação */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Confirmar Devolução</h2>
        <p>
          Você tem certeza que deseja devolver o Chromebook{' '}
          <strong>{selectedChromebook?.serie}</strong>?
        </p>
        <div>
          <button onClick={handleDevolucao}>Sim</button>
          <button onClick={closeModal}>Não</button>
        </div>
      </Modal>
    </div>
  );
};

export default DevolverChromebook;