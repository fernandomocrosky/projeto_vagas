import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function RegisterEmpresaForm() {
  let [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: '',
    password_confirmation: '',
    descricao: '',
    ramo: '',
  });

  let [errors, setErrors] = React.useState({
    email: '',
    password: '',
    name: '',
    descricao: '',
    ramo: '',
  });

  const navigate = useNavigate();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let { name, value } = e.currentTarget;
    const newState = { ...formData, [name]: value };
    setFormData(newState);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const body = JSON.stringify(formData);
    const response = await fetch(
      process.env.REACT_APP_API + '/usuarios/empresas',
      {
        method: 'POST',
        headers,
        body,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setErrors({
        email: data.errors.email,
        password: data.errors.password,
        name: data.errors.name,
        descricao: data.errors.descricao,
        ramo: data.errors.ramo,
      });
    } else {
      navigate('/login');
    }
  }

  function handleCancel() {
    navigate('/login');
  }

  return (
    <div className="form-card">
      <h1>Registro Empresa</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <input
            className="form-control"
            placeholder="E-mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span className="form-error">
            {errors.email ? errors.email[0] : null}
          </span>
        </div>

        <div className="form-fields">
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="form-error">
            {errors.password ? errors.password[0] : null}
          </span>
        </div>

        <div className="form-fields">
          <input
            className="form-control"
            placeholder="Confirm Password"
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
        </div>

        <div className="form-fields">
          <input
            className="form-control"
            placeholder="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <span className="form-error">{errors.name}</span>
        </div>

        <div className="form-fields">
          <textarea
            style={{ resize: 'none' }}
            className="form-control"
            name="descricao"
            value={formData.descricao}
            placeholder="Descricao"
            rows={10}
            onChange={handleChange}
          />
          <span className="form-error">
            {errors.descricao ? errors.descricao[0] : null}
          </span>
        </div>

        <div className="form-fields">
          <input
            style={{ marginTop: '15rem' }}
            type="text"
            name="ramo"
            className="form-control"
            value={formData.ramo}
            placeholder="ramo"
            onChange={handleChange}
          />
          <span className="form-error">
            {errors.ramo ? errors.ramo[0] : null}
          </span>
        </div>

        <div className="d-flex justify-content-evenly form-btns">
          <button
            type="submit"
            className="btn btn-primary">
            Register
          </button>
          <button
            className="btn btn-danger"
            onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterEmpresaForm;
