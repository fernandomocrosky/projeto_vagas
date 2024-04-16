'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { login } from '../../auth/api';

const initialValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const router = useRouter();

  const handleSubmit = (values) => {
    login(values)
      .then(async (res) => {
        await Swal.fire({
          title: 'success',
          text: 'Logado com sucess',
          icon: 'success',
        }).then(() => localStorage.setItem('token', res.data.token));
      })
      .catch(async (err) => {
        await Swal.fire({
          title: 'erro',
          text: 'Login ou senha invalidos',
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
          placeholder="email"
        />

        <Field
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
