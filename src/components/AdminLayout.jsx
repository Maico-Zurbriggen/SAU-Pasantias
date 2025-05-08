import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../styles/Layout.css';

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para limpiar el estado de la sesión si es necesario
    navigate('/');
  };

  return (
    <div className="layout">
      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button 
          className="toggle-button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <ul className="nav-links">
          <li>
            <Link to="/admin/registrar-empresa">Registrar Empresa</Link>
          </li>
          {/* Aquí puedes agregar más opciones del menú */}
        </ul>
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};