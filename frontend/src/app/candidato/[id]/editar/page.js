'use client';
import { useUser } from '../../../_stores/useUser';
import { useRouter } from 'next/navigation';
import { updateCandidato } from '../../api';
import CandidatoForm from '../../../components/CandidatoForm';
import Swal from 'sweetalert2';

export default function EditarUsuario({ params }) {
  const router = useRouter();
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const initialValues = {
    name: user.name,
    email: user.email,
  };

  const handleSubmit = (values) => {
    updateCandidato(values, params.id).then((res) => {
      setUser(res.data);
      Swal.fire({
        title: 'Sucesso',
        text: 'Sucesso ao editar',
        icon: 'success',
      }).then(() => {
        router.push('/candidatos');
      });
    });
  };

  return (
    <CandidatoForm
      handleSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
}
