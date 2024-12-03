import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Hook customizado para acessar o estado de autenticação
const useAuth = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Se o usuário estiver logado, define o objeto `user`
    });

    return () => unsubscribe(); // Limpa a assinatura quando o componente for desmontado
  }, [auth]);

  return user; // Retorna o objeto `user` ou `null` se não estiver autenticado
};

export default useAuth; // Exportação default
