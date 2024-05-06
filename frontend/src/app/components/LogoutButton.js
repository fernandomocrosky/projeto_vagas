'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '../_stores/useUser';
import { logout } from '../../auth/api';
import Swal from 'sweetalert2';

export default function LogoutButton() {
  const router = useRouter();
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const handleLogout = () => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Quer mesmo realizar logout?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, realizar Logout!',
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          title: 'Logout Realizado',
          icon: 'success',
          text: 'Logout realizado com sucesso',
        }).then(() => {
          logout().then((res) => {
            setUser({});
            localStorage.removeItem('token');
            router.push('/login');
          });
        });
      }
    });
  };

  return (
    <button
      className="btn btn-primary"
      onClick={() => handleLogout()}>
      Logout
    </button>
  );
}
