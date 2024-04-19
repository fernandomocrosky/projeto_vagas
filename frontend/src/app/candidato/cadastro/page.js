'use client';
import { useRouter } from 'next/navigation';
import CandidatoForm from '../../components/CandidatoForm';
import Swal from 'sweetalert2';
import { useUser } from '../../_stores/useUser';
import React from 'react';

function CadastroCandidatoPage() {
  const router = useRouter();
  const { user } = useUser((state) => ({
    user: state.user,
  }));

  React.useEffect(() => {
    if (user?.auth) {
      if (user?.role === 'Candidato') {
        router.push(`/candidato`);
      }
      router.push('/empresa');
    }
  }, []);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const handleSubmit = (values) => {
    registerCandidato(values)
      .then(async (res) => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Cadastrado com Sucesso',
          icon: 'success',
        }).then(() => router.push('/login'));
      })
      .catch(async (err) => {
        Swal.fire({
          title: 'Oops...',
          text: err?.response?.data?.errors[0],
          icon: 'error',
        });
      });
  };

  return (
    <div>
      <h1>Cadastro Candidato</h1>
      <CandidatoForm
        handleSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </div>
  );
}

export default CadastroCandidatoPage;
