import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services';
import '../styles/LoginForm.css'

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin'
  });
  const [error, setError] = useState(''); // Agregamos estado para manejar el error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await authService.login(formData.role, {
        email: formData.email,
        password: formData.password
      });
      
      if (result) {
        if (formData.role === 'empresa') {
          localStorage.setItem('empresaId', result.id);
          if (result.redirectTo) {
            navigate(result.redirectTo);
            return;
          }
        }
        
        switch(formData.role) {
          case 'empresa':
            navigate('/empresa');
            break;
          case 'admin':
            navigate('/admin');
            break;
          case 'alumno':
            navigate('/alumno');
            break;
          default:
            break;
        }
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      setError('Error al intentar iniciar sesión');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        
        <div className="form-group">
          <label htmlFor="role">Tipo de Usuario</label>
          <select 
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Seleccione un rol</option>
            <option value="alumno">Alumno</option>
            <option value="empresa">Empresa</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingrese su contraseña"
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <button type="submit">Iniciar Sesión</button>

        <div className="forgot-password-link">
          <Link to="/recuperar-password">¿Has olvidado tu contraseña?</Link>
        </div>
      </form>
    </div>
  );
};