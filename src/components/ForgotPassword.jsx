import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("empresa");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/request-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, userType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al procesar la solicitud");
      }

      setMessage(
        "Se ha enviado un correo con las instrucciones para restablecer tu contraseña"
      );
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Recuperar Contraseña</h2>
        <div>
          <div className="form-group">
            <label htmlFor="userType">Tipo de Usuario</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="empresa">Empresa</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="correo@ejemplo.com"
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {message && <div className="message">{message}</div>}

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Instrucciones"}
          </button>
        </div>
      </form>
    </div>
  );
}
