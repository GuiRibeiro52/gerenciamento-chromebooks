import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, loginWithGoogle, isEmailAllowed } from "../firebaseConfig"; 
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;
      
      
      if (!isEmailAllowed(user.email)) {
        throw new Error("Acesso negado. Seu e-mail não tem permissão para acessar.");
      }

      
      navigate("/home"); 
    } catch (error) {
      setError(error.message || "Falha ao autenticar. Verifique seu e-mail e senha.");
    }
  };

  
  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();

      
      if (!isEmailAllowed(user.email)) {
        throw new Error("Acesso negado. Seu e-mail não tem permissão para acessar.");
      }

      
      navigate("/home"); 
    } catch (error) {
      setError(error.message || "Falha ao autenticar com Google.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow w-full font-poppins">
      <div className="bg-white p-8 rounded-lg shadow-lg sm:w-[90%] md:w-[400px]">
        <h1 className="text-center mb-4 font-bold text-lg">SISTEMA DE GERENCIAMENTO DE CHROMEBOOKS</h1>
        <h2 className="text-base text-center mb-6">LOGIN</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" >E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Coloque seu email aqui"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Coloque sua senha aqui"
            />
          </div>
          <button type="submit"
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >Entrar</button>
        </form>

        <div className="flex justify-center mt-4">
          <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-4 bg-white border border-gray-300 rounded-lg py-2 w-full hover:shadow-md transition duration-300">
            <FcGoogle size={24}/>Entrar com Google
          </button>
        </div>

        <div className="text-center text-black opacity-60 text-sm mt-6">
          <p>Desenvolvido por <a href="https://www.guilhermeribeiro.dev.br" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">Guilherme Ribeiro</a>.</p> 
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
