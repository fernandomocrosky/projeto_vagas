'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '../_stores/useUser';
import { deleteCandidato } from '../_api/candidato';
import Swal from 'sweetalert2';
import AuthComponent from '../components/AuthComponent';

function CandidatoPage() {
  const router = useRouter();
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCandidato(user.id).then((res) => {
          Swal.fire({
            title: 'Deletado',
            text: 'Usuário deletado com sucesso',
            icon: 'success',
          }).then((res) => {
            localStorage.removeItem('token');
          });
          router.push('/login');
        });
      }
    });
  };

  return (
    <AuthComponent>
      <div>
        <button
          className="btn btn-success"
          onClick={() => router.push(`candidato/${user.id}/editar`)}>
          Editar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(user.id)}>
          Deletar
        </button>
      </div>
    </AuthComponent>
  );
}

export default CandidatoPage;
