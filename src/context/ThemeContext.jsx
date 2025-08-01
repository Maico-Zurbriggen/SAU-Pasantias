import { useState, useEffect } from 'react';
import { ThemeContext } from './UseTheme';

export const ThemeProvider = ({ children }) => {
  // Verificar si hay una preferencia guardada en localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'off') {
      return false;
    }
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Actualizar el tema en el DOM y guardar la preferencia
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Función para cambiar entre temas
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};