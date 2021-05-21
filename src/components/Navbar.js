import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../AuthContext';
import { logout } from '../server';
import './styles/Navbar.css';
export const Navbar = () => {
  let usuario = useContext(Auth).usuario;
  const cerrarSesion = async () => {
    try {
      logout();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to={usuario ? '/' : '/login'}>
          Inventory
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {usuario ? (
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
            ) : (
              <li className="nav-item active">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
            {usuario ? (
              <li className="nav-item">
                <button
                  className="nav-link btn-outline-light border-0 link-like"
                  onClick={cerrarSesion}>
                  Cerrar Sesión
                </button>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
