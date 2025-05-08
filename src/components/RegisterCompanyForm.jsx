import { useState } from 'react';
import '../styles/RegisterCompanyForm.css';

const API_URL = import.meta.env.VITE_API_URL;

export const RegisterCompanyForm = () => {
  const [formData, setFormData] = useState({
    razonSocial: '',
    email: '',
    cuit: '',
    direccion: '',
    telefono: ''
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Nuevo estado para mensajes de éxito

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword);
      setSuccessMessage('Contraseña copiada al portapapeles');
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error al copiar:', err);
      setError('Error al copiar la contraseña');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validaciones
    if (!formData.razonSocial || !formData.email || !formData.cuit || !formData.direccion) {
      setError('Por favor complete todos los campos obligatorios');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Por favor ingrese un email válido');
      return;
    }

    if (formData.cuit.length !== 11 || !/^\d+$/.test(formData.cuit)) {
      setError('El CUIT debe tener 11 dígitos numéricos');
      return;
    }

    if (formData.telefono && !/^\d+$/.test(formData.telefono)) {
      setError('El teléfono debe contener solo números');
      return;
    }

    const password = generatePassword();
    setGeneratedPassword(password);
    setShowPassword(true);

    try {
      const response = await fetch(`${API_URL}/empresas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          password,
          firstLogin: true
        })
      });

      if (!response.ok) {
        throw new Error('Error al registrar la empresa');
      }

      setSuccessMessage('Empresa registrada exitosamente');
      setShowPassword(true);
      setGeneratedPassword(password);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al registrar la empresa. Por favor intente nuevamente.');
      setShowPassword(false);
      setGeneratedPassword('');
    }
  };

  return (
    <div className="register-company-container">
      <form onSubmit={handleSubmit} className="register-company-form">
        <h2>Registrar Nueva Empresa</h2>
        
        <div className="form-group">
          <label htmlFor="razonSocial">Razón Social*</label>
          <input
            type="text"
            id="razonSocial"
            name="razonSocial"
            value={formData.razonSocial}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cuit">CUIT*</label>
          <input
            type="text"
            id="cuit"
            name="cuit"
            value={formData.cuit}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección*</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
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

        <button type="submit">Registrar Empresa</button>

        {showPassword && (
          <div className="password-container">
            <h3>Contraseña generada:</h3>
            <div className="password-display">
              <span>{generatedPassword}</span>
              <button 
                type="button" 
                onClick={copyToClipboard}
                className="copy-button"
              >
                Copiar
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};