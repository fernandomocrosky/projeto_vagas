'use client';
import CandidatoForm from '../../components/CandidatoForm';
import Swal from 'sweetalert2';
import { useUser } from '../../_stores/useUser';
import { useEffect } from 'react';
import { getUserByToken, registerCandidato } from '../../../auth/api';
import { useRouter } from 'next/navigation';
import { md5 } from 'js-md5';

function CadastroCandidatoPage() {
  const router = useRouter();
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const initialValues = {
    nome: '',
    email: '',
    senha: '',
    experiencia: [],
    competencias: [],
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserByToken()
        .then((res) => {
          if (res.data.tipo.toLowerCase() === 'candidato' && JSON.stringify(user) === '{}') {
            setUser(res.data);
            router.push('/candidato');
          } else if (res.data.tipo.toLowerCase() === 'empresa' && JSON.stringify(user) === '{}') {
            setUser(res.data);
            router.push('/empresa');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleSubmit = (values) => {
    const data = {...values, senha: md5(values.senha)}
    registerCandidato(data)
      .then(async (res) => {
        await Swal.fire({
          title: 'Sucesso',
          text: 'Cadastrado com Sucesso',
          icon: 'success',
        }).then(() => router.push('/login'));
      })
      .catch(async (err) => {
        await Swal.fire({
          title: 'Oops...',
          text: err?.response?.data?.errors[0],
          icon: 'error',
        });
      });
  };

  return (
    <div>
      <h1>Cadastro Candidato</h1>
      <CandidatoForm
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        cadastro={true}
      />
    </div>
  );
}

export default CadastroCandidatoPage;
