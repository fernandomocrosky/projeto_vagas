import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../_stores/useUser';
import { getUserByToken } from '../../auth/api';

function AuthComponent({ children }) {
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      getUserByToken()
        .then((res) => {
          if (res.data.role === 'Candidato' && JSON.stringify(user) === '{}') {
            setUser(res.data);
            router.push('/candidato');
          } else if (res.data.role === 'Empresa' && JSON.stringify(user) === '{}') {
            setUser(res.data);
            router.push('/empresa');
          }
        })
        .catch((err) => router.push('/login'));
    }
  }, []);
  return children;
}

export default AuthComponent;
