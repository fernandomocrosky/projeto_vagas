'use client';
import VagasForm from '../../../components/VagasForm';
import { createVaga } from '../../../_api/vagas';
import { useRouter } from 'next/navigation';

export default function VagasCadastro() {
  const router = useRouter();

  const initialValues = {
    titulo: '',
    descricao: '',
    salario_min: '',
    salario_max: '',
    experiencia: '',
    competencias: [],
    ativo: true,
  };

  const handleSubmit = (values) => {
    createVaga(values).then(() => router.push('/empresa/vagas'));
  };

  return (
    <div>
      <h1>Cadastro de vagas</h1>
      <VagasForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
