import { HashRouter, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { AdminLayout } from './components/AdminLayout';
import { CompanyLayout } from './components/CompanyLayout';
import { StudentLayout } from './components/StudentLayout';
import { RegisterCompanyForm } from './components/RegisterCompanyForm';
import { ChangePassword } from './components/ChangePassword';
import { ForgotPassword } from './components/ForgotPassword';
import { ResetPassword } from './components/ResetPassword';

function App() {
  return (
    <HashRouter basename='/SAU-Pasantias/'>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/recuperar-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="registrar-empresa" element={<RegisterCompanyForm />} />
        </Route>
        <Route path="/empresa/*" element={<CompanyLayout />}>
          <Route path="cambiar-password" element={<ChangePassword />} />
          {/* otras rutas de empresa */}
        </Route>
        <Route path="/alumno/*" element={<StudentLayout />}>
          {/* rutas de alumno */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
