'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/components/LoginForm.module.css';

export default function CadastroFormButtons({ user }) {
  const router = useRouter();
  return (
    <div>
      <button
        className="btn btn-success"
        type="submit">
        {JSON.stringify(user) === '{}' ? 'Cadastrar' : 'Editar'}
      </button>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => router.back()}>
        Cancelar
      </button>
    </div>
  );
}
