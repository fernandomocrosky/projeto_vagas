'use client';
import { useUser } from '../../../_stores/useUser';
import { useRouter } from 'next/navigation';
import { updateCandidato } from '../../api';
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
    name: user.name,
    email: user.email,
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      getUserByToken()
        .then((res) => {
          setUser(res.data);
          if (res?.data?.role === 'Empresa') {
            router.push('/empresa');
          }
        })
        .catch((err) => {
          router.push('/login');
        });
    }
  }, []);

  const handleSubmit = (values) => {
    updateCandidato(values, params.id).then((res) => {
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