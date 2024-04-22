'use client';
import { useUser } from './_stores/useUser';
import AuthComponent from './components/AuthComponent';

function Home() {
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  return (
    <AuthComponent>
      <h1>Hello World</h1>
    </AuthComponent>
  );
}

export default Home;
