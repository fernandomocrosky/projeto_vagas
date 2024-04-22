'use client';
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { getUserByToken, login } from '../../auth/api';
import { useUser } from '../_stores/useUser';
import React from 'react';

const initialValues = {
  email: '',
  password: '',
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
            if (res?.data?.role === 'Candidato') {
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
        <Field
          type="email"
          name="email"
          id="email"
          placeholder="*E-mail"
        />

        <Field
          type="password"
          name="password"
          id="password"
          placeholder="*Password"
        />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
