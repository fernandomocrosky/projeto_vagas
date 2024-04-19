'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '../_stores/useUser';
import React from 'react';
import { deleteCandidato } from './api';
import Swal from 'sweetalert2';

function CandidatoPage() {
  const router = useRouter();
  const { user } = useUser((state) => ({
    user: state.user,
  }));

  React.useEffect(() => {
    if (!user?.auth) {
      router.push('/login');
    } else if (user?.role === 'Empresa') {
      router.push('/empresa');
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
