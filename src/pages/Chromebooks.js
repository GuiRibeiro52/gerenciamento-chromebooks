import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrashAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Modal from "react-modal";

const Chromebooks = () => {
  const [chromebooks, setChromebooks] = useState([]);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedChromebook, setSelectedChromebook] = useState(null);

  useEffect(() => {
    const fetchChromebooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chromebooks"));
        const chromebooksList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChromebooks(chromebooksList);
      } catch (error) {
        setError("Erro ao carregar Chromebooks.");
      }
    };

    fetchChromebooks();
  }, []);

  const openModal = (chromebook) => {
    setSelectedChromebook(chromebook);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedChromebook(null);
  };

  const handleDelete = async () => {
    if (selectedChromebook) {
      try {
        await deleteDoc(doc(db, "chromebooks", selectedChromebook.id));
        setChromebooks((prev) =>
          prev.filter((chromebook) => chromebook.id !== selectedChromebook.id)
        );
        setModalIsOpen(false);
        setSelectedChromebook(null);
      } catch (error) {
        setError("Erro ao deletar o Chromebook.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-poppins">
      <h2 className="text-3xl font-semibold mb-6 text-center">Chromebooks</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <Link to="/chromebooks/novo">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4">
          Cadastrar Novo Chromebook
        </button>
      </Link>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-semibold">
              <th className="px-6 py-4">Nº Patrimônio</th>
              <th className="px-6 py-4">Serial</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {chromebooks
              .sort((a, b) => a.patrimonio.localeCompare(b.patrimonio))
              .map((chromebook) => (
                <tr key={chromebook.id} className="border-t">
                  <td className="px-6 py-4">{chromebook.patrimonio}</td>
                  <td className="px-6 py-4">{chromebook.serie}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      chromebook.status === "disponível"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {chromebook.status}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <Link
                      to={`/chromebooks/editar/${chromebook.id}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaEdit size={18} />
                    </Link>
                    <button
                      onClick={() => openModal(chromebook)}
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
          Você tem certeza que deseja excluir o Chromebook <strong>{selectedChromebook?.patrimonio}</strong>?
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

export default Chromebooks;
