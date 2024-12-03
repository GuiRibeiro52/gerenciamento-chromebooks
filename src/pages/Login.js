import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, loginWithGoogle } from "../firebaseConfig";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/home"); 
    } catch (error) {
      setError("Falha ao autenticar. Verifique seu e-mail e senha.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/home"); 
    } catch (error) {
      setError("Falha ao autenticar com Google.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        {/* Formulário de login com e-mail e senha */}
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
        
        {/* Botão de login com Google */}
        <div style={{ marginTop: "10px" }}>
            <button onClick={handleGoogleLogin} style={{ display: "flex", alignItems: "center" }}>
                <FaGoogle style={{ marginRight: "8px" }} />Entrar com Google
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
