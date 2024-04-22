'use client';

import { Formik, Form, Field } from 'formik';
import CadastroFormButtons from './CadastroFormButtons';

function EmpresaForm({ handleSubmit, initialValues }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      <Form>
        <Field
          name="email"
          id="email"
          type="email"
          placeholder="*E-mail"
        />

        <Field
          name="name"
          id="name"
          type="text"
          placeholder="*Nome"
        />
        <Field
          hidden={localStorage.getItem('token') ? true : false}
          name="password"
          id="password"
          type="password"
          placeholder="*Password"
        />
        <Field
          hidden={localStorage.getItem('token') ? true : false}
          name="password_confirmation"
          id="password_confirmation"
          type="password"
          placeholder="*Confirm Password"
        />
        <Field
          name="ramo"
          id="ramo"
          as="select">
          <option value="Alimentos">Alimentos</option>
          <option value="Quimico">Quimico</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Outros">Outros</option>
        </Field>
        <Field
          name="descricao"
          id="descricao"
          placeholder="*Descricao"
          as="textarea"
        />
        <CadastroFormButtons />
      </Form>
    </Formik>
  );
}

export default EmpresaForm;
