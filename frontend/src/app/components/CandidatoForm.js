'use client';
import { Formik, Form, Field } from 'formik';
import { registerCandidato } from '../../auth/api';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import LoginFormButtons from './LoginFormButtons';
import CadastroFormButtons from './CadastroFormButtons';
import { useUser } from '../_stores/useUser';

function CandidatoForm({ handleSubmit, initialValues }) {
  const { user } = useUser((state) => ({ user: state.user }));
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      <Form>
        <Field
          name="name"
          id="name"
          placeholder="*Nome"
          type="text"
        />
        <Field
          name="email"
          id="email"
          placeholder="*E-mail"
          type="email"
        />
        <Field
          hidden={user ? true : false}
          name="password"
          id="password"
          placeholder="*Password"
          type="password"
        />
        <Field
          hidden={user ? true : false}
          name="password_confirmation"
          id="password_confirmation"
          placeholder="*Confirm Password"
          type="password"
        />
        <CadastroFormButtons user={user} />
      </Form>
    </Formik>
  );
}

export default CandidatoForm;
