import React from 'react';
import './styles.css';
import '../../components/NavBar/Navbar';
import { removeCookie, getCookie } from 'typescript-cookie';
import useUserStore from '../../stores/useUserStore';
import MyNavBar from '../../components/NavBar/Navbar';

const PageStyle = ({ children }: React.PropsWithChildren) => {
  return <div className="home-page-style">{children}</div>;
};

function Home() {
  const { user, setAuth, setUser } = useUserStore((state) => ({
    user: state.user,
    setAuth: state.setAuth,
    setUser: state.setUser,
  }));

  return (
    <div>
      <PageStyle>
        <MyNavBar />
        <h1>Hello World</h1>
      </PageStyle>
    </div>
  );
}

export default Home;
