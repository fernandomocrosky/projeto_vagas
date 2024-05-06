'use client';
import { useUser } from '../../../_stores/useUser';
import { useRouter } from 'next/navigation';
import { updateCandidato } from '../../../_api/candidato';
import CandidatoForm from '../../../components/CandidatoForm';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { getUserByToken } from '../../../../auth/api';

export default function EditarUsuario({ params }) {
  const router = useRouter();
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const initialValues = {
    nome: user.nome,
    email: user.email,
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      getUserByToken()
        .then((res) => {
          if (res.data.role === 'Candidato') {
            setUser(res.data);
          } else if (res.data.role === 'Empresa') {
            router.push('/empresa');
          }
        })
        .catch((err) => router.push('/login'));
    }
  }, []);

  const handleSubmit = (values) => {
    updateCandidato(values).then((res) => {
      Swal.fire({
        title: 'Sucesso',
        text: 'Sucesso ao editar',
        icon: 'success',
      }).then(() => {
        router.push('/candidato');
      });
    });
  };

  return (
    <CandidatoForm
      handleSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
}
