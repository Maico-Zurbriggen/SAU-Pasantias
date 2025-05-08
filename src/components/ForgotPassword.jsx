import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css';

const API_URL = import.meta.env.VITE_API_URL;

export const ForgotPassword = () => {
  const [role, setRole] = useState('empresa');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (role === 'alumno') {
      setError('Los alumnos deben actualizar su contraseña desde sysacad.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${role === 'admin' ? 'admin' : 'empresas'}`);
      const data = await response.json();
      
      const email = e.target.email.value;
      let userExists = false;

      if (role === 'admin') {
        userExists = data[0].email === email;
      } else {
        userExists = data.some(empresa => empresa.email === email);
      }

      if (userExists) {
        setSuccess(true);
      } else {
        setError('No existe una cuenta con ese correo electrónico.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al procesar la solicitud. Por favor, intente nuevamente.');
    }
  };

  if (success) {
    return (
      <div className="forgot-password-container">
        <div className="success-message">
          Se ha enviado un enlace de recuperación a tu correo electrónico.
          <br />
          <button onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h2>Recuperar Contraseña</h2>
        
        <div className="form-group">
          <label htmlFor="role">Tipo de Usuario</label>
          <select 
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="empresa">Empresa</option>
            <option value="admin">Administrador</option>
            <option value="alumno">Alumno</option>
          </select>
        </div>

        {role === 'alumno' ? (
          <div className="info-message">
            Los alumnos deben actualizar su contraseña desde sysacad.
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <button type="submit" disabled={role === 'alumno'}>
          Recuperar Contraseña
        </button>

        <div className="back-link">
          <a href="/" onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}>Volver al inicio de sesión</a>
        </div>
      </form>
    </div>
  );
};