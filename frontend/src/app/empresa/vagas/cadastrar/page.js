'use client';
import VagasForm from '../../../components/VagasForm';
import { createVaga } from '../../../_api/vagas';
import { useRouter } from 'next/navigation';

export default function VagasCadastro() {
  const router = useRouter();

  const initialValues = {
    titulo: null,
    descricao: null,
    salario_min: '',
    salario_max: null,
    experiencia: null,
    competencias: [],
    ativo: true,
  };

  const handleSubmit = (values) => {
    console.log(values)
    values.competencias = values.competencias.map((com) => JSON.parse(com))
    values.ramo_id = parseInt(values.ramo_id)
    values.experiencia = parseInt(values.experiencia)
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
