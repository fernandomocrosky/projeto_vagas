'use client';
import { useRouter } from 'next/navigation';
import EmpresaForm from '../../components/EmpresaForm';
import { useUser } from '../../_stores/useUser';
import { useEffect } from 'react';
import { getUserByToken, registerEmpresa } from '../../../auth/api';
import Swal from 'sweetalert2';

function EmpresaCadastroPage() {
  const router = useRouter();
  const { user } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const initialValues = {
    email: '',
    senha: '',
    nome: '',
    descricao: '',
    ramo: '',
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserByToken()
        .then((res) => {
          if (res.data.tipo === 'Candidato' && JSON.stringify(user) === '{}') {
            setUser(res.data);
            router.push('/candidato');
          } else if (res.data.tipo === 'Empresa' && JSON.stringify(user) === '{}') {
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
    registerEmpresa(values)
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
      <h1>Cadastro empresa</h1>
      <EmpresaForm
        handleSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </div>
  );
}

export default EmpresaCadastroPage;
