import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../styles/Layout.css';

export const CompanyLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
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
          {/* Aquí se agregarán más opciones en el futuro */}
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