'use client';
import { Formik, Form, Field } from 'formik';
import CadastroFormButtons from './CadastroFormButtons';
import { useUser } from '../_stores/useUser';
import styles from '../styles/components/LoginForm.module.css';

function CandidatoForm({ handleSubmit, initialValues }) {
  const { user } = useUser((state) => ({ user: state.user }));
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      <Form>
        <div className={styles.formCard}>
          <div className={styles.formFields}>
            <Field
              className="form-control"
              name="name"
              id="name"
              placeholder="*Nome"
              type="text"
            />
            <Field
              className="form-control"
              name="email"
              id="email"
              placeholder="*E-mail"
              type="email"
            />
            <Field
              className="form-control"
              hidden={localStorage.getItem('token') ? true : false}
              name="password"
              id="password"
              placeholder="*Password"
              type="password"
            />
            <Field
              className="form-control"
              hidden={localStorage.getItem('token') ? true : false}
              name="password_confirmation"
              id="password_confirmation"
              placeholder="*Confirm Password"
              type="password"
            />
            <CadastroFormButtons user={user} />
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default CandidatoForm;
