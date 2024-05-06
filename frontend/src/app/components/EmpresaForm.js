'use client';
import { Formik, Form, Field } from 'formik';
import CadastroFormButtons from './CadastroFormButtons';
import styles from '../styles/components/LoginForm.module.css';
import { useUser } from '../_stores/useUser';

function EmpresaForm({ handleSubmit, initialValues }) {
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
              name="nome"
              id="nome"
              type="text"
              placeholder="*Nome"
            />
            <Field
              className="form-control"
              name="email"
              id="email"
              type="email"
              placeholder="*E-mail"
            />

            <Field
              className="form-control"
              hidden={localStorage.getItem('token') ? true : false}
              name="senha"
              id="senha"
              type="password"
              placeholder="*Password"
            />
            {/* <Field
              className="form-control"
              hidden={localStorage.getItem('token') ? true : false}
              name="password_confirmation"
              id="password_confirmation"
              type="password"
              placeholder="*Confirm Password"
            /> */}
            <Field
              className="form-control mt-3"
              name="ramo"
              id="ramo"
              as="select">
              <option value="Alimentos">Alimentos</option>
              <option value="Quimico">Quimico</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Outros">Outros</option>
            </Field>
            <Field
              className="form-control my-3"
              name="descricao"
              id="descricao"
              placeholder="*Descricao"
              as="textarea"
            />
            <CadastroFormButtons user={user} />
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default EmpresaForm;
