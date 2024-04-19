'use client';
import { useEffect } from 'react';
import { useUser } from './_stores/useUser';
import { redirect, useRouter } from 'next/navigation';
import { getUserByToken, redirectUser } from '../auth/api';

function Home() {
  const router = useRouter();
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      getUserByToken()
        .then((res) => {
          setUser(res.data);
          if (res?.data?.role === 'Candidato') {
            console.log(res.data);
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

  return <div>hello world</div>;
}

export default Home;
