'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '../_stores/useUser';
import LoginForm from '../components/LoginForm';
import LoginFormButtons from '../components/LoginFormButtons';
import React from 'react';

export function LoginPage() {
  const { user } = useUser((state) => ({
    user: state.user,
  }));

  const router = useRouter();

  React.useEffect(() => {
    if (user?.auth) {
      if (user?.role === 'Candidato') {
        router.push('/candidato');
      } else {
        router.push('/empresa');
      }
    }
  }, [user]);

  return (
    <div>
      <LoginForm />
      <LoginFormButtons />
    </div>
  );
}

export default LoginPage;
