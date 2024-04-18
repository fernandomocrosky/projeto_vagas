'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '../_stores/useUser';
import React from 'react';

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

  return (
    <div>
      <button onClick={() => router.push(`candidato/${user.id}/editar`)}>Editar</button>
      <button>Deletar</button>
    </div>
  );
}

export default CandidatoPage;
