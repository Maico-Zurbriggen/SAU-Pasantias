import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ResetPassword.css';

const API_URL = import.meta.env.VITE_API_URL;

export const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const empresaId = localStorage.getItem('empresaId');
      const response = await fetch(`${API_URL}/empresas/${empresaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: formData.newPassword,
          firstLogin: false
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al cambiar la contraseña');
      }

      setSuccessMessage('Contraseña cambiada exitosamente');
      setTimeout(() => {
        navigate('/empresa');
      }, 2000);
    } catch (error) {
      setError(error.message || 'Error al cambiar la contraseña. Por favor verifique su contraseña actual.');
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <h2>Cambiar Contraseña</h2>

        <div className="form-group">
          <label htmlFor="currentPassword">Contraseña Actual*</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">Nueva Contraseña*</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Nueva Contraseña*</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
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

        <button type="submit">
          Cambiar Contraseña
        </button>

        <div className="back-link">
          <a href="/empresa" onClick={(e) => {
            e.preventDefault();
            navigate('/empresa');
          }}>Volver al panel de empresa</a>
        </div>
      </form>
    </div>
  );
};