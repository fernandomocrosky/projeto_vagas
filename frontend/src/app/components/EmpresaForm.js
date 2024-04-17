'use client';

import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/navigation';
import { registerEmpresa } from '../../auth/api';
import Swal from 'sweetalert2';

const initialValues = {
  email: '',
  password_confirmation: '',
  password: '',
  name: '',
  descricao: '',
  ramo: '',
};

function EmpresaForm() {
  const router = useRouter();

  const handleSubmit = (values) => {
    console.log(values);
    registerEmpresa(values)
      .then(async (res) => {
        await Swal.fire({
          title: 'Sucesso',
          text: 'Cadastrado com Sucesso',
          icon: 'success',
        }).then(() => router.push('/login'));
      })
      .catch(async (err) => {
        await Swal.fire({
          title: 'Oops...',
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
          name="email"
          id="email"
          type="email"
          placeholder="E-mail"
        />

        <Field
          name="name"
          id="name"
          type="text"
          placeholder="Nome"
        />
        <Field
          name="password"
          id="password"
          type="password"
          placeholder="Password"
        />
        <Field
          name="password_confirmation"
          id="password_confirmation"
          type="password"
          placeholder="Confirm Password"
        />
        <Field
          name="ramo"
          id="ramo"
          as="select">
          <option
            value=""
            disabled
            selected="selected">
            Selecione o Ramo
          </option>
          <option value="Alimentos">Alimentos</option>
          <option value="Quimico">Quimico</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Outros">Outros</option>
        </Field>
        <Field
          name="descricao"
          as="textarea"
        />

        <button type="submit">Cadastrar</button>
        <button
          type="button"
          onClick={() => router.back()}>
          Cancelar
        </button>
      </Form>
    </Formik>
  );
}

export default EmpresaForm;
