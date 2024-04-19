'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '../_stores/useUser';
import React, { useEffect } from 'react';
import { deleteCandidato } from './api';
import Swal from 'sweetalert2';
import { getUserByToken } from '../../auth/api';

function CandidatoPage() {
  const router = useRouter();
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  console.log(user);

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

  const handleDelete = (id) => {
    deleteCandidato(user.id).then((res) => {
      Swal.fire({
        title: 'success',
        text: 'Deletado',
        icon: 'success',
      });
      router.push('/login');
    });
  };

  return (
    <div>
      <button onClick={() => router.push(`candidato/${user.id}/editar`)}>Editar</button>
      <button onClick={() => handleDelete(user.id)}>Deletar</button>
    </div>
  );
}

export default CandidatoPage;
