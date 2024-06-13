'use client';
import VagasForm from '../../../components/VagasForm';
import { useEffect, useState } from 'react';
import { createVaga } from '../../../_api/vagas';
import { useRouter } from 'next/navigation';
import { getCompetencias } from '../../../_api/competencias';

export default function VagasCadastro() {
  const router = useRouter();
  const [competencias, setCompetencias] = useState([]);

  const initialValues = {
    titulo: null,
    descricao: null,
    salario_min: '',
    salario_max: null,
    experiencia: null,
    competencias: [],
    ativo: true,
  };

  useEffect(() => {
    getCompetencias()
      .then((res) => {
        setCompetencias(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (values) => {
    values.competencias = values.competencias.map((competencia) => {
      competencia.id = parseInt(competencia.id);
      const comAchada = competencias.filter((com) => com.id == competencia.id);
      return {
        id: parseInt(competencia.id),
        nome: comAchada[0].nome,
      };
    });
    console.log(values);
    values.ramo_id = parseInt(values.ramo_id);
    values.experiencia = parseInt(values.experiencia);
    createVaga(values).then(() => router.push('/empresa/vagas'));
  };

  return (
    <div>
      <h1>Cadastro de vagas</h1>
      <VagasForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        competencias={competencias}
      />
    </div>
  );
}
