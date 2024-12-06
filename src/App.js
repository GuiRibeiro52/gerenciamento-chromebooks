import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"; 
import Header from "./components/Header"; 
import Login from "./pages/Login"; 
import Home from "./pages/Home";
import Professores from "./pages/Professores";
import ProfessorForm from "./pages/ProfessorForm"; 
import Chromebooks from "./pages/Chromebooks"; 
import ChromebookForm from "./pages/ChromebookForm";
import EmprestarChromebook from "./pages/EmprestarChromebook";
import DevolverChromebook from "./pages/DevolverChromebook"; 
import PrivateRoute from './routes/PrivateRoute'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginLayout />} />            
          <Route path="/*" element={<MainLayout />}>
          <Route path="home" element={<PrivateRoute element={Home} />} />
          <Route path="professores" element={<PrivateRoute element={Professores} />} />
          <Route path="professores/novo" element={<PrivateRoute element={ProfessorForm} />} />
          <Route path="professores/editar/:id" element={<PrivateRoute element={ProfessorForm} />} />
          <Route path="chromebooks" element={<PrivateRoute element={Chromebooks} />} />
          <Route path="chromebooks/novo" element={<PrivateRoute element={ChromebookForm} />} />
          <Route path="chromebooks/editar/:id" element={<PrivateRoute element={ChromebookForm} />} />
          <Route path="emprestar" element={<PrivateRoute element={EmprestarChromebook} />} />
          <Route path="devolver" element={<PrivateRoute element={DevolverChromebook} />} />
        </Route>
      </Routes>
    </Router>
  );
}


function LoginLayout() {
  return (  
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>    
  );
}

function MainLayout() {
  return (
    <div className="min-h-screen  w-full">
      <Header />
      <div className="main-content w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
