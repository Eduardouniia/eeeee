import React, { useState, createContext } from "react";

// Criando o contexto
export const ShowContext = createContext();

// Criando o provedor do contexto
export const ShowProvider = ({ children }) => {
  const [show, setShow] = useState(0);
  const [work, setWork] = useState(true);
  // Retorna o card correspondente ao valor de show

  return (
    <ShowContext.Provider value={{ show, setShow, work, setWork }}>
      {/* Renderiza o card correspondente */}

      {/* Renderiza os componentes filhos */}
      {children}
    </ShowContext.Provider>
  );
};
