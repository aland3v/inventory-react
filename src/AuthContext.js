import React, { useEffect, useState } from 'react';
import { projectAuth } from './firebase/config';
//import Cargando from "../components/Cargando";

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    projectAuth.onAuthStateChanged(function (user) {
      setUsuario(user);
      setShowChild(true);
    });
  }, []);

  if (!showChild) {
    return '';
    //return <Cargando />;
  } else {
    return (
      <Auth.Provider
        value={{
          usuario,
        }}>
        {children}
      </Auth.Provider>
    );
  }
};
