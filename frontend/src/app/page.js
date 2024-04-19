'use client';
import React from 'react';
import { useUser } from './_stores/useUser';
import { useRouter } from 'next/navigation';

function Home() {
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
    } else {
      router.push('/login');
    }
  }, [user]);

  return <div>hello world</div>;
}

export default Home;
