'use client';
import { useRouter } from 'next/navigation';

function LoginFormButtons() {
  const router = useRouter();

  return (
    <div>
      <button
        type="button"
        onClick={() => router.push('/empresa/cadastro')}>
        Cadastro Empresa
      </button>

      <button
        type="button"
        onClick={() => router.push('/candidato/cadastro')}>
        Cadastro Candidato
      </button>
    </div>
  );
}

export default LoginFormButtons;
