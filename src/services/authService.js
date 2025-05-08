const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  login: async (role, credentials) => {
    try {
      let endpoint;
      let response;
      
      switch(role) {
        case 'admin': {
          endpoint = '/admin';
          response = await fetch(`${API_URL}${endpoint}`);
          const adminData = await response.json();
          const admin = adminData[0];
          
          if (credentials.email === admin.email && 
              credentials.password === admin.password) {
            return admin;
          }
          return null;
        }
        case 'empresa': {
          endpoint = '/empresas';
          response = await fetch(`${API_URL}${endpoint}`);
          const empresas = await response.json();
          const empresa = empresas.find(emp => 
            emp.email === credentials.email && 
            emp.password === credentials.password
          );
          
          if (empresa) {
            if (empresa.firstLogin) {
              return {
                ...empresa,
                redirectTo: '/empresa/cambiar-password'
              };
            }
            return empresa;
          }
          return null;
        }
        case 'alumno': {
          endpoint = '/alumnos_simulados';
          response = await fetch(`${API_URL}${endpoint}`);
          const alumnos = await response.json();
          const alumno = alumnos.find(al => 
            al.email === credentials.email && 
            al.password === credentials.password
          );
          return alumno || null;
        }
        default:
          return null;
      }
    } catch (error) {
      console.error('Error en autenticación:', error);
      throw error;
    }
  }
};