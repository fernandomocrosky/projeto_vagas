import React from 'react';
import { getCookie, setCookie } from 'typescript-cookie';
import './styles.css';
import useUserStore from '../../stores/useUserStore';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const { user, setAuth, setUser } = useUserStore((state) => ({
    user: state.user,
    setAuth: state.setAuth,
    setUser: state.setUser,
  }));

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = React.useState('');

  let navigate = useNavigate();

  React.useEffect(() => {
    if (getCookie('token')) {
      navigate('/');
    }
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      let response = await fetch(process.env.REACT_APP_API + '/login', {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });
      let data = await response.json();

      if (response.status === 422) {
        setErrors({ ...data.errors });
        setLoginError('');
        console.log(data);
      } else if (response.status === 401) {
        setLoginError(data.errors);
        setErrors({ email: '', password: '' });
      } else if (response.ok) {
        setCookie('token', data.token, {
          expires: 0.1,
        });
        setAuth(true);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    let { name, value } = e.currentTarget;
    const newState = { ...formData, [name]: value };
    setFormData(newState);
  }

  function handleRegisterCandidato() {
    navigate('/usuarios/candidatos');
  }

  function handleRegisterEmpresa() {
    navigate('/usuarios/empresas');
  }

  return (
    <div className="login-card">
      <div className="form-header">
        <h1>Login</h1>
        {loginError ? <span className="form-error">{loginError}</span> : null}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="email"
            value={formData.email}
          />
          {errors.email ? (
            <span className="form-error">{errors.email}</span>
          ) : null}
        </div>

        <div className="form-input">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={formData.password}
          />
          {errors.password ? (
            <span className="form-error">{errors.password}</span>
          ) : null}
        </div>
        <div className="form-buttons">
          <button
            type="submit"
            className="btn btn-success">
            Login
          </button>
          <button
            type="button"
            className="btn btn-link btn-sm"
            onClick={handleRegisterCandidato}>
            Registro Candidato
          </button>

          <button
            type="button"
            className="btn btn-link btn-sm"
            onClick={handleRegisterEmpresa}>
            Registro Empresa
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
