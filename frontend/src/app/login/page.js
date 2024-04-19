'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '../_stores/useUser';
import LoginForm from '../components/LoginForm';
import LoginFormButtons from '../components/LoginFormButtons';
import { useEffect } from 'react';
import { getUserByToken } from '../../auth/api';

export function LoginPage() {
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
          setUser(res.data);
          if (res?.data?.role === 'Candidato') {
            router.push('/candidato');
          } else {
            router.push('/empresa');
          }
        })
        .catch((err) => {
          router.push('/login');
        });
    }
  }, []);

  return (
    <div>
      <LoginForm />
      <LoginFormButtons />
    </div>
  );
}

export default LoginPage;
