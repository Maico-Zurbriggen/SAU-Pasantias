import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/LoginForm.css";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el token de la URL
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (!token) {
      setError("Token no válido");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al restablecer la contraseña");
      }

      setMessage("Contraseña actualizada correctamente");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="error-message">
        Token no válido o expirado. Por favor, solicita un nuevo enlace de
        recuperación.
      </div>
    );
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Restablecer Contraseña</h2>
        <div className="form-group">
          <label htmlFor="password">Nueva Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        {message && <div className="error-message message">{message}</div>}

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar Contraseña"}
          </button>
        </div>
      </form>
    </div>
  );
}
