import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import React, { PropsWithChildren } from 'react';
import Home from './pages/Home/Home';
import useUserStore from './stores/useUserStore';
import RegisterCandidato from './pages/RegisterCandidato/RegisterCandidato';
import RegisterEmpresa from './pages/RegisterEmpresa/RegisterEmpresa';
import EditUser from './pages/EditUser/EditUser';
import { getCookie } from 'typescript-cookie';

type ProtectedRoutesProps = PropsWithChildren;

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { user, setAuth, setUser } = useUserStore((state) => ({
    user: state.user,
    setAuth: state.setAuth,
    setUser: state.setUser,
  }));

  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('eu');
    if (!user.auth) {
      navigate('/login', { replace: true });
    } else {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token'),
      };
      fetch(process.env.REACT_APP_API + '/me', {
        headers,
      })
        .then((response) => response.json())
        .then((data) => {
          setUser({ ...data });
        });
    }
  }, [navigate]);

  return <>{children}</>;
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/usuarios/candidatos"
          element={<RegisterCandidato />}
        />

        <Route
          path="/usuarios/candidatos/:id"
          element={
            <ProtectedRoutes>
              <EditUser />
            </ProtectedRoutes>
          }></Route>

        <Route
          path="/usuarios/empresas/:id"
          element={
            <ProtectedRoutes>
              <EditUser />
            </ProtectedRoutes>
          }></Route>
        <Route
          path="/usuarios/empresas"
          element={<RegisterEmpresa />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
