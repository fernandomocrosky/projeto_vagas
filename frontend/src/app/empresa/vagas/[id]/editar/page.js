'use client';
import { useRouter } from 'next/navigation';
import { getVaga } from '../../../../_api/vagas';
import { updateVaga } from '../../../../_api/vagas';
import { getCompetencias } from '../../../../_api/competencias';
import React from 'react';
import VagasForm from '../../../../components/VagasForm';

export default function VagaEdit({ params }) {
  const router = useRouter();
  const [vaga, setVaga] = React.useState({});
  const [id, setId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [competencias, setCompetencias] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    getVaga(params.id).then((res) => {
      setVaga(res.data);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    getCompetencias()
      .then((res) => {
        setCompetencias(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (values) => {
    console.log(values);
    values.competencias = values.competencias.map((competencia) => {
      competencia.id = parseInt(competencia.id);
      const comAchada = competencias.filter((com) => com.id == competencia.id);
      return {
        id: parseInt(competencia.id),
        nome: comAchada[0].nome,
      };
    });
    updateVaga(params.id, values).then(() => {
      router.back();
    });
  };

  const initialValues = { ...vaga, ativo: vaga.ativo == '1' ? true : false };

  if (!loading) {
    return (
      <div>
        <h1>Edit Vaga</h1>
        <VagasForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          competencias={competencias}
          edit
        />
      </div>
    );
  } else {
    return <div>Carregando...</div>;
  }
}
