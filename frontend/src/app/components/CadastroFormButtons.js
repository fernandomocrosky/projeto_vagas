'use client';

import { useRouter } from 'next/navigation';

export default function CadastroFormButtons({ user }) {
  const router = useRouter();
  return (
    <div>
      <button type="submit">{JSON.stringify(user) === '{}' ? 'Cadastrar' : 'Editar'}</button>
      <button
        type="button"
        onClick={() => router.back()}>
        Cancelar
      </button>
    </div>
  );
}
