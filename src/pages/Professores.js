import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal'; 
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrashAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; 

const Professores = () => {
  const [professores, setProfessores] = useState([]);
  const [error, setError] = useState("");

  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

 
  Modal.setAppElement('#root');

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "professores"));
        const professoresList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
       
        professoresList.sort((a, b) => a.nome.localeCompare(b.nome));
        setProfessores(professoresList);
      } catch (error) {
        setError("Erro ao carregar professores.");
      }
    };

    fetchProfessores();
  }, []);

 
  const openModal = (professor) => {
    setSelectedProfessor(professor);
    setModalIsOpen(true);
  };

  
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProfessor(null);
  };

  
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "professores", selectedProfessor.id));
      setProfessores(professores.filter((prof) => prof.id !== selectedProfessor.id));
      closeModal();
    } catch (error) {
      setError("Erro ao deletar o professor.");
      closeModal();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-poppins">
      <h2 className="text-3xl font-semibold text-center mb-6">Professores</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <Link to="/professores/novo">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4">
          Cadastrar Novo Professor
        </button>
      </Link>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-semibold">
              <th className="py-4 px-6">Nome</th>
              <th className="py-4 px-6">MASP</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Ações</th>
            </tr>
          </thead>
          <tbody>
            {professores.map((professor) => (
              <tr key={professor.id} className="border-t">
                <td className="py-4 px-6">{professor.nome}</td>
                <td className="py-4 px-6">{professor.masp}</td>
                <td className="py-4 px-6">{professor.email}</td>
                <td className="px-6 py-4 flex items-center gap-4">                  
                  <Link to={`/professores/editar/${professor.id}`}>
                    <button className="text-blue-500 hover:text-blue-600">
                      <FaEdit size={18} />
                    </button>
                  </Link>
    
                  <button
                    onClick={() => openModal(professor)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px] mx-auto"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
      >
        <h2 className="text-lg font-semibold mb-4">Confirmar Exclusão</h2>
        <p className="mb-4">
          Você tem certeza que deseja excluir o professor <strong>{selectedProfessor?.nome}</strong>?
        </p>
        <div className="flex justify-between gap-4">
          <button
            onClick={handleDelete}
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
  );
};

export default Professores;
