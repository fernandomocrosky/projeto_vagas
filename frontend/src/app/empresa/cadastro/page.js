'use client';
import { useRouter } from 'next/navigation';
import EmpresaForm from '../../components/EmpresaForm';
import { useUser } from '../../_stores/useUser';
import React from 'react';

function EmpresaCadastroPage() {
  const router = useRouter();
  const { user } = useUser((state) => ({
    user: state.user,
  }));

  const initialValues = {
    email: '',
    password_confirmation: '',
    password: '',
    name: '',
    descricao: '',
    ramo: '',
  };

  React.useEffect(() => {
    if (user?.auth) {
      if (user?.role === 'Candidato') {
        router.push(`/candidato`);
      }
      router.push('/empresa');
    }
  }, []);

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
    <div>
      <h1>Cadastro empresa</h1>
      <EmpresaForm
        handleSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </div>
  );
}

export default EmpresaCadastroPage;
