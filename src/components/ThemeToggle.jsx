import { useTheme } from '../context/UseTheme';
import '../styles/ThemeToggle.css';

export function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle-button" 
      onClick={toggleTheme}
      aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}