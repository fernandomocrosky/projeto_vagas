'use client';
import { useEffect } from 'react';
import { useUser } from '../../_stores/useUser';
import { useRouter } from 'next/navigation';
import { getUserByToken } from '../../../auth/api';
import EmpresaForm from '../../components/EmpresaForm';
import { updateEmpresa } from '../../_api/empresa';
import Swal from 'sweetalert2';

function EmpresaEditPage({ params }) {
  const router = useRouter();
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const initialValues = {
    nome: user.nome,
    email: user.email,
    descricao: user.descricao,
    ramo: user.ramo,
  };

  const handleSubmit = (values) => {
    updateEmpresa(values)
      .then((res) => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Sucesso ao editar',
          icon: 'success',
        }).then(() => {
          router.push('/empresa');
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Erro',
          text: err?.data?.errors[0] ? 'Erro ao editar' : err?.data?.errors[0],
          icon: 'error',
        });
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      getUserByToken()
        .then((res) => {
          setUser(res.data);
          if (res?.data?.role === 'Candidato') {
            setUser(res.data);
            router.push('/candidato');
          } else if (res?.data?.role === 'Empresa') {
            setUser(res.data);
          }
        })
        .catch((err) => {
          router.push('/login');
        });
    }
  }, []);

  return (
    <div>
      <h1>Empresa Edit</h1>
      <EmpresaForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default EmpresaEditPage;
