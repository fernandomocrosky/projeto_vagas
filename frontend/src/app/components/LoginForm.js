'use client';
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { getUserByToken, login } from '../../auth/api';
import { useUser } from '../_stores/useUser';
import React from 'react';
import styles from '../styles/components/LoginForm.module.css';

const initialValues = {
  email: '',
  senha: '',
};

function LoginForm() {
  const router = useRouter();
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const handleSubmit = (values) => {
    login(values)
      .then(async (res) => {
        await Swal.fire({
          title: 'success',
          text: 'Logado com sucesso',
          icon: 'success',
        }).then(() => {
          localStorage.setItem('token', res.data.token);
          getUserByToken().then((res) => {
            setUser(res.data);
            if (res?.data?.tipo.toLowerCase() === 'candidato') {
              router.push('/candidato');
            } else {
              router.push('/empresa');
            }
          });
        });
      })
      .catch(async (err) => {
        console.log(err);
        await Swal.fire({
          title: 'erro',
          text: err?.response?.data?.errors[0],
          icon: 'error',
        });
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      <Form>
        <div className={styles.formCard}>
          <div className={styles.formFields}>
            <h1>Login</h1>
            <Field
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="*E-mail"
            />

            <Field
              className="form-control"
              type="password"
              name="senha"
              id="senha"
              placeholder="*Password"
            />
            <div className={styles.loginFormButtons}>
              <button
                type="submit"
                className="btn btn-success">
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => router.push('/empresa/cadastro')}>
                Cadastro Empresa
              </button>

              <button
                type="button"
                className="btn btn-md btn-primary"
                onClick={() => router.push('/candidato/cadastro')}>
                Cadastro Candidato
              </button>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default LoginForm;
