'use client';
import { useUser } from '../../../_stores/useUser';
import CandidatoForm from '../../../components/CandidatoForm';

export default function EditarUsuario() {
  const { user } = useUser((state) => ({
    user: state.user,
  }));
  const handleSubmit = (values) => {
    console.log(values);
  };

  return <CandidatoForm handleSubmit={handleSubmit} />;
}
