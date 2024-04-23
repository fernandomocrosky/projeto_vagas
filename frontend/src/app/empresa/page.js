'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '../_stores/useUser';
import AuthComponent from '../components/AuthComponent';
import { deleteEmpresa } from '../_api/empresa';
import Swal from 'sweetalert2';

function HomeEmpresa() {
  const router = useRouter();
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmpresa(id)
          .then((res) => {
            Swal.fire({
              title: 'Deletado',
              text: 'Empresa deletada com sucesso',
              icon: 'success',
            }).then(() => {
              localStorage.removeItem('token');
              setUser({});
              router.push('/login');
            });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Oops...',
              text: error?.response?.data?.errors[0] ? error?.response?.data?.errors[0] : 'Erro ao deletar',
              icon: 'error',
            });
          });
      }
    });
  };

  return (
    <AuthComponent>
      <div>Logado com sucesso como empresa</div>
      <div>
        <button onClick={() => router.push(`empresa/${user.id}/editar`)}>Editar</button>
        <button onClick={() => handleDelete(user.id)}>Deletar</button>
      </div>
    </AuthComponent>
  );
}

export default HomeEmpresa;
