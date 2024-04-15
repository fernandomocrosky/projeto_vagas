import React from 'react';
import './styles.css';
import '../../components/NavBar/Navbar';
import useUserStore from '../../stores/useUserStore';
import MyNavBar from '../../components/NavBar/Navbar';
import { useParams } from 'react-router-dom';
import EditEmpresaForm from '../../components/EditEmpresaForm/EditEmpresaForm';

const PageStyle = ({ children }: React.PropsWithChildren) => {
  return <div className="home-page-style">{children}</div>;
};

function EditUser() {
  const { id } = useParams();

  const { user, setAuth, setUser } = useUserStore((state) => ({
    user: state.user,
    setAuth: state.setAuth,
    setUser: state.setUser,
  }));

  return (
    <div>
      <PageStyle>
        <MyNavBar />
        <EditEmpresaForm />
      </PageStyle>
    </div>
  );
}

export default EditUser;
