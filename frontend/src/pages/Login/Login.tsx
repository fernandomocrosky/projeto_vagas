import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import React from 'react';
import './styles.css';
import useUserStore from '../../stores/useUserStore';

const PageStyle = ({ children }: React.PropsWithChildren) => {
  return <div className="login-page-style">{children}</div>;
};

function Login() {
  const navigate = useNavigate();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  React.useEffect(() => {
    if (user.auth) navigate('/');
  }, [user, navigate]);

  return (
    <div>
      <PageStyle>
        <LoginForm />
      </PageStyle>
    </div>
  );
}

export default Login;
