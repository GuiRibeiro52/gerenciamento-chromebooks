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
import { Outlet } from "react-router-dom"; // Importando o Outlet para renderizar as rotas internas

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout para Login */}
        <Route path="/" element={<LoginLayout />}>
          <Route index element={<Login />} />
        </Route>

        {/* Layout principal com o Header */}
        <Route path="/*" element={<MainLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="professores" element={<Professores />} />
          <Route path="professores/novo" element={<ProfessorForm />} />
          <Route path="professores/editar/:id" element={<ProfessorForm />} />
          <Route path="chromebooks" element={<Chromebooks />} />
          <Route path="chromebooks/novo" element={<ChromebookForm />} />
          <Route path="chromebooks/editar/:id" element={<ChromebookForm />} />
          <Route path="emprestar" element={<EmprestarChromebook />} />
          <Route path="devolver" element={<DevolverChromebook />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Layout exclusivo para a página de Login (sem Header)
function LoginLayout() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

// Layout principal (Header aparece aqui)
function MainLayout() {
  return (
    <div>
      <Header /> {/* O Header será exibido em todas as páginas, exceto Login */}
      <div className="main-content">
        <Outlet /> {/* Aqui as rotas internas do MainLayout serão renderizadas */}
      </div>
    </div>
  );
}

export default App;
