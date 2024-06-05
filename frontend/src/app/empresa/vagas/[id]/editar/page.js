'use client';
import { useRouter } from 'next/navigation';
import { getVaga } from '../../../../_api/vagas';
import { updateVaga } from '../../../../_api/vagas';
import React from 'react';
import VagasForm from '../../../../components/VagasForm';

export default function VagaEdit({ params }) {
  const router = useRouter();
  const [vaga, setVaga] = React.useState({});
  const [id, setId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    getVaga(params.id).then((res) => {
      setVaga(res.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (values) => {
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
          edit
        />
      </div>
    );
  } else {
    return <div>Carregando...</div>;
  }
}
