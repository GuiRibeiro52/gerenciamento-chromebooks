// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; // Importando o header fixo
import Login from "./pages/Login"; // Página de Login
import Home from "./pages/Home"; // Página inicial
import Professores from "./pages/Professores"; // Listagem de professores
import ProfessorForm from "./pages/ProfessorForm"; // Formulário de cadastro/edição de professores
import Chromebooks from "./pages/Chromebooks"; // Listagem de Chromebooks
import ChromebookForm from "./pages/ChromebookForm"; // Formulário de cadastro/edição de Chromebooks
import EmprestarChromebook from "./pages/EmprestarChromebook"; // Página de empréstimo de Chromebook
import DevolverChromebook from "./pages/DevolverChromebook"; // Página de devolução de Chromebook

function App() {
  return (
    <Router>
      <Header /> {/* Incluindo o Header fixo */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/professores" element={<Professores />} />
          <Route path="/professores/novo" element={<ProfessorForm />} />
          <Route path="/professores/editar/:id" element={<ProfessorForm />} />
          <Route path="/chromebooks" element={<Chromebooks />} />
          <Route path="/chromebooks/novo" element={<ChromebookForm />} />
          <Route path="/chromebooks/editar/:id" element={<ChromebookForm />} />
          <Route path="/emprestar" element={<EmprestarChromebook />} />
          <Route path="/devolver" element={<DevolverChromebook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
