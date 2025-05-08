import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/ResetPassword.css';

const API_URL = import.meta.env.VITE_API_URL;

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Obtener parámetros de la URL
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const id = searchParams.get('id');
  const role = searchParams.get('role');

  useEffect(() => {
    if (!token || !email || !id || !role) {
      setError('Enlace de restablecimiento inválido');
    }
  }, [token, email, id, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.newPassword || !formData.confirmPassword) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const endpoint = role === 'admin' ? 'admin' : 'empresas';
      const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: formData.newPassword
        })
      });

      if (!response.ok) {
        throw new Error('Error al restablecer la contraseña');
      }

      setSuccessMessage('Contraseña restablecida exitosamente');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Error al restablecer la contraseña. Por favor intente nuevamente.');
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <h2>Restablecer Contraseña</h2>

        <div className="form-group">
          <label htmlFor="newPassword">Nueva Contraseña*</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            disabled={!token || !email || !id || !role}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña*</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={!token || !email || !id || !role}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <button type="submit" disabled={!token || !email || !id || !role}>
          Restablecer Contraseña
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