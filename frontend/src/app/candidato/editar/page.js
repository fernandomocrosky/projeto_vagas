'use client';
import { useUser } from '../../_stores/useUser';
import { useRouter } from 'next/navigation';
import { updateCandidato } from '../../_api/candidato';
import CandidatoForm from '../../components/CandidatoForm';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { getUserByToken } from '../../../auth/api';
import { getCompetencias } from '../../_api/competencias';

export default function EditarUsuario({ params }) {
  const router = useRouter();
  const [competencias, setCompetencias] = useState([]);
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const initialValues = {
    nome: user.nome,
    email: user.email,
    experiencia: user.experiencia,
    competencias: user.competencias,
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      getUserByToken()
        .then((res) => {
          if (res.data.tipo.toLowerCase() === 'candidato') {
            setUser(res.data);
          } else if (res.data.tipo.toLowerCase() === 'empresa') {
            router.push('/empresa');
          }
        })
        .catch((err) => router.push('/login'));
    }
  }, []);

  useEffect(() => {
    getCompetencias()
      .then((res) => {
        setCompetencias(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (values) => {
    values.experiencia = values.experiencia?.map((exp) => (exp.fim === '' ? { ...exp, fim: null } : { ...exp }));
    values.competencias = values.competencias.map((competencia) => {
      competencia.id = parseInt(competencia.id);
      const comAchada = competencias.filter((com) => com.id == competencia.id);
      return {
        id: parseInt(competencia.id),
        nome: comAchada[0].nome,
      };
    });

    updateCandidato(values).then((res) => {
      Swal.fire({
        title: 'Sucesso',
        text: 'Sucesso ao editar',
        icon: 'success',
      }).then(() => {
        router.push('/candidato');
      });
    });
  };

  return (
    <CandidatoForm
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      competencias={competencias}
    />
  );
}
